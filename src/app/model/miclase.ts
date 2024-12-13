import { showAlert, showAlertError } from "../tools/message-functions";

export class MiClase {

  static jsonMiClaseExample =
    `{
      "bloqueInicio": 7,
      "bloqueTermino": 9,
      "dia": "2022-08-09",
      "horaInicio": "13:00",
      "horaFin": "15:15",
      "idAsignatura": "PGY4121",
      "nombreAsignatura": "Aplicaciones Móviles",
      "nombreProfesor": "Cristián Gómez Vega",
      "seccion": "001D",
      "sede": "Alonso Ovalle"
    }`;

  static jsonMiClaseEmpty =
    `{
      "bloqueInicio": "",
      "bloqueTermino": "",
      "dia": "",
      "horaInicio": "",
      "horaFin": "",
      "idAsignatura": "",
      "nombreAsignatura": "",
      "nombreProfesor": "",
      "seccion": "",
      "sede": ""
    }`;

  bloqueInicio = '';
  bloqueTermino = '';
  dia = '';
  horaInicio = '';
  horaFin = '';
  idAsignatura = '';
  nombreAsignatura = '';
  nombreProfesor = '';
  seccion = '';
  sede = '';

  constructor() { }

  public static getNewClase(
    bloqueInicio: string,
    bloqueTermino: string,
    dia: string,
    horaInicio: string,
    horaFin: string,
    idAsignatura: string,
    nombreAsignatura: string,
    nombreProfesor: string,
    seccion: string,
    sede: string
  ) {
    const asis = new MiClase();
    asis.bloqueInicio = bloqueInicio;
    asis.bloqueTermino = bloqueTermino;
    asis.dia = dia;
    asis.horaInicio = horaInicio;
    asis.horaFin = horaFin;
    asis.idAsignatura = idAsignatura;
    asis.nombreAsignatura = nombreAsignatura;
    asis.nombreProfesor = nombreProfesor;
    asis.seccion = seccion;
    asis.sede = sede;
    return asis;
  }


  static isValidMiClaseQrCode(qr: string) {
    if (qr === '') return false;

    try {
      const json = JSON.parse(qr);

      if (json.bloqueInicio !== undefined
        && json.bloqueTermino !== undefined
        && json.dia !== undefined
        && json.horaInicio !== undefined
        && json.horaFin !== undefined
        && json.idAsignatura !== undefined
        && json.nombreAsignatura !== undefined
        && json.nombreProfesor !== undefined
        && json.seccion !== undefined
        && json.sede !== undefined
      ) {
        return true;
      }
    } catch (error) { }

    showAlert('El código QR escaneado no corresponde a un Asistencia de Clases');
    return false;
  }

}