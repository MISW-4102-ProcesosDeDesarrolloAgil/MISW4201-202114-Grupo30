from flaskr import create_app
from flask_restful import Api
from flaskr.modelos.modelos import db
from flaskr.vistas.vistas import VistaCancionesUsuario, VistaCancion, \
                                 VistaNotificacionUsuario, VistaComentario, \
                                 VistaComentarios, VistaComentariosAlbum, \
                                 VistaSignIn, VistaAlbum, VistaAlbumesUsuario, \
                                 VistaCancionesAlbum, VistaLogIn, \
                                 VistaAlbumesCanciones, VistaRecursosCompartidos, \
                                 VistaUsuarios, VistaUsuario, VistaAlbumes, \
                                 VistaUsuariosCompartidosPorTipo, VistaComentariosCancion

from flask_jwt_extended import JWTManager
from flask_cors import CORS, cross_origin


app = create_app('default')
app_context = app.app_context()
app_context.push()

db.init_app(app)
db.create_all()
CORS(app, resources={r"/*": {"origins": "*"}})

api = Api(app)
api.add_resource(VistaCancionesUsuario, '/usuario/<int:id_usuario>/canciones')
api.add_resource(VistaCancion, '/cancion/<int:id_cancion>')
api.add_resource(VistaAlbumesCanciones, '/cancion/<int:id_cancion>/albumes')
api.add_resource(VistaSignIn, '/signin')
api.add_resource(VistaLogIn, '/logIn')
api.add_resource(VistaAlbumesUsuario, '/usuario/<int:id_usuario>/albumes')
api.add_resource(VistaAlbum, '/album/<int:id_album>')
api.add_resource(VistaCancionesAlbum, '/album/<int:id_album>/canciones')
api.add_resource(VistaRecursosCompartidos, '/recurso/compartido')
api.add_resource(VistaUsuariosCompartidosPorTipo, '/recurso/compartido/<int:id_recurso>/<string:tipo_recurso>')
api.add_resource(VistaUsuarios, '/usuarios')
api.add_resource(VistaUsuario, '/usuario/<int:id_usuario>')
api.add_resource(VistaAlbumes, '/albumes')
api.add_resource(VistaNotificacionUsuario, '/usuario/<int:id_usuario>/notificaciones')
api.add_resource(VistaComentarios, '/comentario')
api.add_resource(VistaComentario, '/comentario/<int:id_comentario>')
api.add_resource(VistaComentariosAlbum, '/comentario/album/<int:id_album>')
api.add_resource(VistaComentariosCancion, '/comentario/cancion/<int:id_cancion>')

jwt = JWTManager(app)

# import logging
# logging.basicConfig()
# logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)
