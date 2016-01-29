
/*
    Divisas.
    Complemento al Comprobante Fiscal Digital (CFD) y Comprobante Fiscal Digital
    por Internet (CFDI) para identificar las operaciones de compra y venta de
    divisas que realizan los centros cambiarios y las casa de cambio; haciendo
    mención expresa de que los comprobantes se expiden por la “compra”, o bien,
    por la “venta” de divisas.

    http://www.sat.gob.mx/sitio_internet/cfd/divisas/Divisas.xsd
    http://www.sat.gob.mx/informacion_fiscal/factura_electronica/Paginas/complemento_divisas.aspx

    Aplica para CFD (versión 2.0 y 2.2) y CFDI (versión 3.0 y 3.2)
 */

function Divisas() {

  /* Atributo requerido para expresar la versión del complemento de divisas */
  this.version = '1.0';

  /* Elemento para definir el tipo de operación realizada. venta o compra de divisas */
  this.tipoOperacion = null;

}

var _divisas = {
  tipoOperacion: ['compra','venta']
};
