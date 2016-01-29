
/*
    Pago en especie
    Complemento para la expedición de comprobantes fiscales por la donación en
    la facilidad fiscal de Pago en Especie

    http://www.sat.gob.mx/informacion_fiscal/factura_electronica/Paginas/complemento_pagoenespecie.aspx
    http://www.sat.gob.mx/sitio_internet/cfd/pagoenespecie/pagoenespecie.xsd

    Aplica para CFDI (versión 3.2)
 */

function PagoEnEspecie() {

  /* Atributo requerido para la expresión de la versión del complemento */
  this.version = '1.1'; /* pattern: [A-ZÑ&]{3}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z0-9]?[A-Z0-9]?[0-9A-Z]-(18|19|20)\d\d(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])-[0-9]{3} */

  /* Clave de inscripción al Padrón de Instituciones Culturales adheridas al Programa de Pago en Especie */
  this.cvePIC = null;

  /* Número de folio de la solicitud de donación */
  this.folioSolDon = null;

  /* Nombre de la pieza de arte */
  this.pzaArtNombre = null;

  /* Técnica de producción de la pieza de arte */
  this.pzaArtTecn = null;

  /* Año de producción de la pieza de arte */
  this.pzaArtAProd = null;

  /* Dimensiones de la pieza de arte */
  this.pzaArtDim = null;

}
