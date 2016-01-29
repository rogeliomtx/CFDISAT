
/*
    Complemento para Facturas Electrónicas de Personas Físicas integrantes de coordinados.
    Persona Física integrante de Coordinado "PFIC

    Este complemento permite incorporar a un Comprobante Fiscal Digital (CFD) o
    a un Comprobante Fiscal Digital a través de Internet (CFDI) los datos de
    identificación del vehículo que corresponda a personas físicas integrantes
    de coordinados, que opten por pagar el impuesto individualmente de conformidad
    con lo establecido por el artículo 83, séptimo párrafo de la Ley del Impuesto
    sobre la Renta.

    http://www.sat.gob.mx/sitio_internet/cfd/pfic/pfic.xsd
    http://www.sat.gob.mx/informacion_fiscal/factura_electronica/Paginas/complemento_pfcoordinado.aspx

    Aplica para CFD (versión 2.2) y CFDI (versión 3.2)
 */

function PFintegranteCoordinado() {

  /* Atributo requerido con valor prefijado a 1.0 que indica la versión del estándar bajo el que se encuentra expresado el complemento. */
  this.version = null;

  /* Atributo requerido para precisar Clave vehicular que corresponda a la versión del vehículo enajenado. */
  this.claveVehicular = null;

  /* Atributo requerido para señalar la placa o número de folio del permiso del vehículo que corresponda. */
  this.placa = null;

  /* Atributo opcional para precisar el RFC de la persona física integrante de coordinados, que opte por pagar el impuesto individualmente. */
  this.RFCPF = null; /* pattern: [A-Z,Ñ,&]{3,4}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z,0-9]?[A-Z,0-9]?[0-9,A-Z]? */

}
