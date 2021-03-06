from flask_sqlalchemy import SQLAlchemy
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from marshmallow import fields
import enum
import datetime
import pytz


db = SQLAlchemy()

albumes_canciones = db.Table('album_cancion',
    db.Column('album_id', db.Integer, db.ForeignKey('album.id'), primary_key = True),
    db.Column('cancion_id', db.Integer, db.ForeignKey('cancion.id'), primary_key = True))

class Cancion(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    titulo = db.Column(db.String(128))
    minutos = db.Column(db.Integer)
    segundos = db.Column(db.Integer)
    interprete = db.Column(db.String(128))
    usuario = db.Column(db.Integer, db.ForeignKey("usuario.id"))
    albumes = db.relationship('Album', secondary = 'album_cancion', back_populates="canciones")
    compartidos = db.relationship('RecursoCompartido', backref='cancion')
    propia = db.Column(db.String(5), default='True')
    comentarios = db.relationship('Comentario', backref='cancion')

class Medio(enum.Enum):
   DISCO = 1
   CASETE = 2
   CD = 3

class TipoRecurso(enum.Enum):
    ALBUM = 1
    CANCION = 2

class TipoNotificacion(enum.Enum):
   COMPARTIR_ALBUM = 1
   COMPARTIR_CANCION = 2
   COMENTAR = 3
   CALIFICAR = 4

class Album(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(128))
    anio = db.Column(db.Integer)
    descripcion = db.Column(db.String(512))
    medio = db.Column(db.Enum(Medio))
    usuario = db.Column(db.Integer, db.ForeignKey("usuario.id"))
    canciones = db.relationship('Cancion', secondary = 'album_cancion', back_populates="albumes")
    compartidos = db.relationship('RecursoCompartido', backref='album')
    propio = db.Column(db.Integer)
    comentarios = db.relationship('Comentario', backref='album')

class RecursoCompartido(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tipo_recurso = db.Column(db.Enum(TipoRecurso))
    usuario_origen_id = db.Column(db.Integer)
    usuario_destino_id = db.Column(db.Integer, db.ForeignKey("usuario.id"))
    cancion_id = db.Column(db.Integer, db.ForeignKey("cancion.id"))
    album_id = db.Column(db.Integer, db.ForeignKey("album.id"))

class Comentario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    usuario = db.Column(db.Integer, db.ForeignKey("usuario.id"), nullable=False)
    cancion_id = db.Column(db.Integer, db.ForeignKey("cancion.id"))
    album_id = db.Column(db.Integer, db.ForeignKey("album.id"))
    time = db.Column(db.DateTime, nullable=False)
    texto = db.Column(db.String(1000), nullable=False)

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50))
    contrasena = db.Column(db.String(50))
    albumes = db.relationship('Album', cascade='all, delete, delete-orphan')
    compartidos = db.relationship('RecursoCompartido', backref='usuario_destino')
    canciones = db.relationship('Cancion', cascade='all, delete, delete-orphan')
    comentarios = db.relationship('Comentario', backref='comentador', lazy='subquery')
    notificaciones = db.relationship('Notificacion', cascade='all, delete, delete-orphan')

class Notificacion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fecha_registro = db.Column(db.DateTime(timezone=True), default=datetime.datetime.now(pytz.timezone('Etc/GMT+5')))
    mensaje = db.Column(db.String(512))
    tipo_notificacion = db.Column(db.Enum(TipoNotificacion))
    usuario = db.Column(db.Integer, db.ForeignKey("usuario.id"))

class EnumADiccionario(fields.Field):
    def _serialize(self, value, attr, obj, **kwargs):
        if value is None:
            return None
        return {"llave": value.name, "valor": value.value}

class CancionSchema(SQLAlchemyAutoSchema):
    class Meta:
         model = Cancion
         include_relationships = True
         load_instance = True

class AlbumSchema(SQLAlchemyAutoSchema):
    medio = EnumADiccionario(attribute=("medio"))
    class Meta:
         model = Album
         include_relationships = True
         load_instance = True

class UsuarioSchema(SQLAlchemyAutoSchema):
    class Meta:
         model = Usuario
         include_relationships = True
         load_instance = True

class RecursoCompartidoSchema(SQLAlchemyAutoSchema):
    tipo_recurso = EnumADiccionario(attribute=("tipo_recurso"))
    class Meta:
         model = RecursoCompartido
         include_relationships = True
         load_instance = True

class ComentarioSchema(SQLAlchemyAutoSchema):
    class Meta:
         model = Comentario
         include_relationships = True
         load_instance = True

class NotificacionSchema(SQLAlchemyAutoSchema):
    tipo_notificacion = EnumADiccionario(attribute=("tipo_notificacion"))
    class Meta:
         model = Notificacion
         include_relationships = True
         load_instance = True

class ComentarioRespuestaSchema(SQLAlchemyAutoSchema):
    class Meta:
        fields = ("id", "cancion_id", "album_id", "time", "texto", "nombre_usuario")
