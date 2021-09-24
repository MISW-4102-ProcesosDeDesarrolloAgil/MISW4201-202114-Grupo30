from flaskr.tests import BaseTestClass
import unittest
import json
import string
import random
from flaskr.app import app

ROUTE_POST = '/usuario/1/notificaciones'

class NotificacionTestCase(BaseTestClass):

    def test_tipo_notificacion_vacio(self):
        with app.test_client() as client:
            result = client.post(
                ROUTE_POST,
                data=json.dumps(dict(
                    tipo=None,
                    nombre='Cancion1',
                    usuarios='hector'
                )),
                content_type='application/json', follow_redirects=True
            )
            self.assertEqual(
                result.status_code,
                400
            )

    def test_nombre_recurso_vacio(self):
        with app.test_client() as client:
            result = client.post(
                ROUTE_POST,
                data=json.dumps(dict(
                    tipo='COMPARTIR_ALBUM',
                    nombre=None,
                    usuarios='hector'
                )),
                content_type='application/json', follow_redirects=True
            )
            self.assertEqual(
                result.status_code,
                400
            )
