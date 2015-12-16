
/*
    Complemento SPEI.
    Complemento para el uso de SPEI Tercero a Tercero

    http://www.sat.gob.mx/sitio_internet/cfd/spei/spei.xsd
    http://www.sat.gob.mx/informacion_fiscal/factura_electronica/Paginas/complemento_spei.aspx

    Aplica para CFDI (versión 3.2)
 */

function ComplementoSPEI() {

  /* Estándar aplicable a operaciones de SPEI a terceros */
  this.SPEITercero = null; /* array: SPEITercero() */

}

var _complementoSPEI = {

  /* Estándar aplicable a operaciones de SPEI a terceros */
  SPEITercero: function() {

    /* Elemento para describir los datos del ordenante del SPEI */
    this.ordenante = {

      /* Atributo requerido para expresar el nombre del Banco o Institución Financiera emisora del SPEI */
      bancoEmisor: null,

      /* Nombre de la persona física o moral que ordena el envío del pago. */
      nombre: null,

      /* Categoría de la Cuenta a la que se efectuará el cargo por la transferencia electrónica de fondos. */
      tipoCuenta: null,

      /* Cuenta que deberá estar ligada al Tipo de Cuenta del Ordenante, donde serán cargados los fondos. */
      cuenta: null,

      /* Corresponde al registro federal de contribuyentes o clave única de registro de población del ordenante. Se pondrá ND en caso de no tenerlo disponible */
      rfc: null

    };

    /* Elemento para describir los datos del beneficiario del SPEI */
    this.beneficiario = {

      /* Atributo requerido para expresar el nombre del Banco o Institución Financiera Receptora del SPEI */
      bancoReceptor: null,

      /* Nombre de la persona física o moral receptora del pago. */
      nombre: null,

      /* Categoría de la cuenta a la que se efectuará el abono por la transferencia electrónica de fondos. Consultar Catálogo de Tipos de Cuenta. */
      tipoCuenta: null,

      /* Esta cuenta deberá estar ligada al campo Tipo de Cuenta del Beneficiario, donde son abonados los fondos. */
      cuenta: null,

      /* Atributo requerido para la expresión del registro federal de contribuyentes del beneficiario. Se pondrá ND en caso de no estar disponible */
      rfc: null,

      /* Descripción del motivo por el que el ordenante hace el pago al beneficiario. */
      concepto: null,

      /* Importes de IVA correspondientes al pago. El monto debe ser mayor a cero y menor o igual a 9,999,999,999,999,999.99 */
      iva: null,

      /* Atributo obligatorio para la expresión del monto de la operación. Se trata de un entero positivo */
      montoPago: null

    };

    /* Fecha de operación con formato. Debe ser la misma que la fecha de operación del sistema. */
    this.fechaOperacion = null; /* pattern: ((000[1-9])|(00[1-9][0-9])|(0[1-9][0-9]{2})|([1-9][0-9]{3}))-((0[1-9])|(1[012]))-((0[1-9])|([12][0-9])|(3[01])) */

    /* Hora del acreditamiento */
    this.hora = null; /* pattern: (([01][0-9])|(2[0-3]))(:[0-5][0-9]){2}(\.[0-9]+)? */

    /* Clave SPEI del Participante Emisor. */
    this.claveSPEI = null;

    /* Atributo requerido para contener el sello digital del comprobante de pago. El sello deberá ser expresado cómo una cadena de texto en formato Base 64. */
    this.sello = null;

    /* Atributo requerido para la identificación del certificado de seguridad utilizado para el sello digital. */
    this.numeroCertificado = null;

    /* Atributo que contiene la información del CDA fidedigna que la institución ha enviado a Banco de México. */
    this.cadenaCDA = null;

  }
};
