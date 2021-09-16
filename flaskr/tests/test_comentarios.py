from flaskr.tests import BaseTestClass
import unittest
import json
import string
import random
from datetime import datetime
from flaskr.app import app

ROUTE_POST = '/comentario'
class ComentarioTestCase(BaseTestClass):

    def test_texto_vacio(self):
        with app.test_client() as client:
            result = client.post(
                ROUTE_POST,
                data=json.dumps(dict(
                    usuario=1,
                    cancion_id=1,
                    time = datetime.now(),
                    texto=None
                )),
                content_type='application/json', follow_redirects=True
            )
            self.assertEqual(
                result.status_code,
                400
            )

    def test_usuario_vacio(self):
        with app.test_client() as client:
            result = client.post(
                ROUTE_POST,
                data=json.dumps(dict(
                    usuario=None,
                    album_id=1,
                    time = datetime.now(),
                    texto=self.generate_text()
                )),
                content_type='application/json', follow_redirects=True
            )
            self.assertEqual(
                result.status_code,
                400
            )

    def test_recurso_vacio(self):
        with app.test_client() as client:
            result = client.post(
                ROUTE_POST,
                data=json.dumps(dict(
                    usuario=1,
                    cancion_id=None,
                    time = datetime.now(),
                    texto=self.generate_text()
                )),
                content_type='application/json', follow_redirects=True
            )
            self.assertEqual(
                result.status_code,
                400
            )

            result = client.post(
                ROUTE_POST,
                data=json.dumps(dict(
                    usuario=1,
                    album_id=None,
                    time = datetime.now(),
                    texto=self.generate_text()
                )),
                content_type='application/json', follow_redirects=True
            )
            self.assertEqual(
                result.status_code,
                400
            )

    def test_texto_cantidad_caracteres(self):
        with app.test_client() as client:
            result = client.post(
                ROUTE_POST,
                data=json.dumps(dict(
                    usuario=1,
                    album_id=1,
                    time = datetime.now(),
                    texto=self.generate_text(1005)
                )),
                content_type='application/json', follow_redirects=True
            )
            self.assertEqual(
                result.status_code,
                400
            )

    def generate_text(self, c = 1000):
        return ''.join(random.choices(string.ascii_letters+string.digits,k=c))

if __name__ == '__main__':
    unittest.main()
