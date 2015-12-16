
/*
    CFDI Registro Fiscal.
    Complemento para incluir los datos de identificación de los CFDIs generados
    en Registro Fiscal.

    http://www.sat.gob.mx/sitio_internet/cfd/cfdiregistrofiscal/cfdiregistrofiscal.xsd
    http://www.sat.gob.mx/informacion_fiscal/factura_electronica/Paginas/complemento_registro_fiscal.aspx

    Aplica para CFDI (versión 3.2)
 */

function CFDIRegistroFiscal() {

  /* Atributo requerido que indica la versión del complemento CFDI Registro Fiscal. */
  this.version = '1.0';

  /* Atributo requerido para expresar la relación del CFDI con el Registro Fiscal. */
  this.folio = null; /* pattern: [0-9]{16} */

}
