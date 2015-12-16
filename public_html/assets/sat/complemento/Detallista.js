
/*
    Sector de ventas al detalle (Detallista).
    Complemento para Facturas Electrónicas del sector de ventas al detalle.

    Este complemento a diferencia del resto, no tiene caracter obligatorio, sino
    que se trata de una facilidad para que los contribuyentes puedan adoptarlo a
    efecto de eficientar el procesamiento de la información.

    http://www.sat.gob.mx/informacion_fiscal/factura_electronica/Paginas/complemento_detallista.aspx
    http://www.sat.gob.mx/sitio_internet/cfd/detallista/detallista.xsd

    Aplica para CFD (versión 2.0 y 2.2) y CFDI (versión 3.0 y 3.2)
 */

function Detallista() {



}


var _detallista = {

  Secuencia: function() {

    /* Nodo requerido que especifica la transacción a utilizar */
    this.requestForPaymentIdentification = null; /* array: EntityType() */

    /* Nodo opcional que especifica que tipo de instrucciones comerciales son enviadas */
    this.specialInstruction = {

      /* Nodo requerido que especifica información de texto que aplica a todo el mensaje de la factura. La información estará en función al código del tema de texto */
      text: null, /* array: Text() */

      /* Atributo para especificar el codigo del tipo de instrucciones comerciales que son enviadas */
      code: null /* type: codeArray */

    };
  },

  /* Nodo requerido que especifica el tipo de transacción */
  EntityType: function() {
      this.entityType = null; /* type: entityTypeArray */
  },

  /* Nodo requerido que especifica información de texto que aplica a todo el mensaje de la factura. La información estará en función al código del tema de texto */
  Text: function() {
    this.text = null;
  },

  entityTypeArray = [ 'INVOICE', 'DEBIT_NOTE', 'CREDIT_NOTE', 'LEASE_RECEIPT', 'HONORARY_RECEIPT', 'PARTIAL_INVOICE', 'TRANSPORT_DOCUMENT', 'AUTO_INVOICE'],
  codeArray = ['AAB', 'DUT', 'PUR', 'ZZZ' ]
};
