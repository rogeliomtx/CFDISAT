
/*
    TuristaPasajeroExtranjero.
    Complemento para el manejo de datos de Turista Pasajero Extranjero en las
    Facturas Electrónicas.

    Este complemento permite incorporar a una Factura Electrónica, los datos de
    identificación de turistas o pasajeros extranjeros.

    http://www.sat.gob.mx/sitio_internet/cfd/TuristaPasajeroExtranjero/TuristaPasajeroExtranjero.xsd
    http://www.sat.gob.mx/informacion_fiscal/factura_electronica/Paginas/complemento_turista.aspx

    Aplica para CFD (versión 2.2) y CFDI (versión 3.2)
 */

function TuristaPasajeroExtranjero() {

  /* Versión del complemento para TuristaPasajeroExtranjero. */
  this.version = '1.0';

  /* Elemento requerido para expresar la información de la operación realizada */
  this.datosTransito = null; /* array: DatosTransito()  */

  /* Atributo requerido para expresar la fecha y hora del Arribo o Salida del medio de transporte utilizado. Se expresa en la forma aaaa-mm-ddThh:mm:ss, de acuerdo con la especificación ISO 8601. */
  this.fechadeTransito = null;

  /* Atributo requerido para incorporar la operación realizada: Arribo ó Salida. */
  this.tipoTransito = null; /* type: tipoTransito */

}

var _turistaPasajeroExtranjero = {
  DatosTransito: function() {

    /* Atributo requerido para expresar si es vía “Aérea”, “Marítima” o "Terrestre" */
    this.via = null; /* type: vía */

    /* Atributo requerido para la expresión del número de pasaporte. */
    this.tipoId = null;

    /* Atributo requerido para expresar el número de identificación (pasaporte, visa, etc.) */
    this.numeroId = null;

    /* Atributo requerido para expresar la nacionalidad del turista. */
    this.nacionalidad = null;

    /* Atributo requerido para señalar la empresa de transporte que lo ingresa a territorio nacional o lo traslada de salida. */
    this.empresaTransporte = null;

    /* Atributo opcional para expresar el identificador del medio de transporte usado, ejemplo: número de vuelo. */
    this.idTransporte = null;

  },

  via : ['Aérea','Marítima','Terrestre'],
  tipoTransito : ['Arribo','Salida']
}
