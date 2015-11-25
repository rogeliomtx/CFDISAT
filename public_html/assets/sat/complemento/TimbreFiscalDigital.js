
/* 
    Timbre fiscal digital (TFD). 
    Complemento requerido para el Timbrado Fiscal Digital que da valides a un Comprobante Fiscal Digital.
    http://www.sat.gob.mx/sitio_internet/timbrefiscaldigital/TimbreFiscalDigital.xsd
    http://www.sat.gob.mx/informacion_fiscal/factura_electronica/Paginas/timbre_fiscal.aspx

    Aplica para CFD (versión 2.0 y 2.2) y CFDI (versión 3.0 y 3.2)
 */

function TimbreFiscalDigital() {
    
    /* Atributo requerido para la expresión de la versión del estándar del Timbre Fiscal Digital */
    this.version = "1.0";
    
    /* Atributo requerido para expresar los 36 caracteres del UUID de la transacción de timbrado */
    this.UUID = null; /* [a-f0-9A-F]{8}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{4}-[a-f0-9A-F]{12} */
    
    /* Atributo requerido para expresar la fecha y hora de la generación del timbre */
    this.fechaTimbrado = null; /* Date */
    
    /* Atributo requerido para contener el sello digital del comprobante fiscal, que será timbrado. El sello deberá ser expresado cómo una cadena de texto en formato Base 64. */
    this.selloCFD = null;
    
    /* Atributo requerido para expresar el número de serie del certificado del SAT usado para el Timbre */
    this.noCertificadoSAT = null;
    
    /* Atributo requerido para contener el sello digital del Timbre Fiscal Digital, al que hacen referencia las reglas de resolución miscelánea aplicable. El sello deberá ser expresado cómo una cadena de texto en formato Base 64. */
    this.selloSAT = null;
    
}