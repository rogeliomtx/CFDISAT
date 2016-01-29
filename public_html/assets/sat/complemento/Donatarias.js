
/*
    Donatarias. v.1.1.
    Nodo opcional para incluir la información requerida por el Servicio de Administración
    Tributaria a las organizaciones civiles o fideicomisos autorizados para recibir
    donativos, que permite hacer deducibles los Comprobantes Fiscales Digitales (CFD)
    y Comprobantes Fiscales Digitales a través de Internet (CFDI) a los donantes.

    http://www.sat.gob.mx/sitio_internet/cfd/donat/donat11.xsd
    http://www.sat.gob.mx/informacion_fiscal/factura_electronica/Paginas/complemento_donatarias.aspx

    Aplica para CFD (versión 2.2) y CFDI (versión 3.2)
 */

function Donatarias() {

  /* Atributo requerido para expresar la versión del complemento de donatarias */
  this.version = '1.1';

  /* Atributo requerido para expresar el número del oficio en que se haya informado a la organización civil o fideicomiso, la procedencia de la autorización para recibir donativos deducibles, o su renovación correspondiente otorgada por el Servicio de Administración Tributaria. */
  this.noAutorizacion = null;

  /* Atributo requerido para expresar la fecha del oficio en que se haya informado a la organización civil o fideicomiso, la procedencia de la autorización para recibir donativos deducibles, o su renovación correspondiente otorgada por el Servicio de Administración Tributaria. */
  this.fechaAutorizacion = null;

  /* Atributo requerido para señalar de manera expresa que el comprobante que se expide se deriva de un donativo. */
  this.leyenda = null;

}
