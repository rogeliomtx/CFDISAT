
/* Estándar de Comprobante Fiscal Digital por Internet. */
function Comprobante33() {
    
    this.CFDIRelacionados; /* [] */
    
    this.emisor = {
      rfc: null,
      nombre: null,
      regimenFiscal: null
    };
    
    this.receptor = {
        rfc: null,
        nombre: null,
        residenciaFiscal: null, /* catCFDI:c_Pais */
        numRegIdTrib: null,
        usoCFDI: null /* catCFDI:c_UsoCFDI */
    };
    
    this.conceptos = null; /* [] */
    
    this.impuestos = {
        impuestos: null, /* [] ComprobanteImpuestoRentencion | ComprobanteImpuestoTrasladado */
        
        TotalImpuestosRetenidos: null,
        
        TotalImpuestosTrasladados: null
    };
    
    this.complemento; /* [] */
    
    this.addenda; /* [] */
    
    this.version;
    
    this.serie;
    
    this.folio;
    
    this.fecha;
    
    this.sello;
    
    this.formatoPago;
    
    this.noCertificado;
    
    this.certificado;
    
    this.condicionesDePago;
    
    this.subtotal;
    
    this.descuento;
    
    this.moneda; /* catCFDI:c_Moneda */
    
    this.tipoCambio;
    
    this.total;
    
    this.tipoComprobante; /* catCFDI:c_TipoDeComprobante */
    
    this.metodoPago;
    
    this.lugarExpedicion; /* CP */
    
    this.confirmacion;
    
}


function ComprobanteImpuestoRentencion() {
    
    this.impuesto; /* catCFDI:c_Impuesto */
    
    this.importe;
    
}


function ComprobanteImpuestoTrasladado() {
    
    this.impuesto; /* catCFDI:c_Impuesto */
    
    this.tipoFactor;
    
    this.tasaOCuota;
    
    this.importe;
    
}


function Concepto() {
    
    this.concepto = null; /* [] */
    
    this.claveProdServ; /* catCFDI:c_ClaveProdServ */
    
    this.noIdentificacion;
    
    this.cantidad;
    
    this.claveUnidad; /* catCFDI:c_ClaveUnidad */
    
    this.unidad;
    
    this.descripcion;
    
    this.valorUnitario;
    
    this.importe;
    
    this.descuento;
    
}

function _Concepto() {
    
    this.impuestos = {
        trasladados: null, /* ImpuestoTrasladado */
        retenciones: null /* ImpuestoRetencion */
    };
    
    this.informacionAduanera = {
        numeroPedimento: null
    };
    
    this.cuentaPredial = {
        numero: null
    };
    
    this.complementoConcepto = null; /* [any] */
    
    this.parte = null; /* [] */
    
}

function Parte() {
    this.informacionAduanera = {
        numeroPedimento: null
    };
    
    this.claveProdServ; /* catCFDI:c_ClaveProdServ */
    
    this.noIdentificacion;
    
    this.cantidad;
    
    this.unidad;
    
    this.descripcion;
    
    this.valorUnitario;
    
    this.importe;
    
}


function ImpuestoTrasladado() {
    
    this.trasladado;
    
    this.base;
    
    this.impuesto; /* catCFDI:c_Impuesto */
    
    this.tipoFactor; /* catCFDI:c_TipoFactor */
  
    this.tasaOCuota;
    
    this.importe;
}

function ImpuestoRetencion() {
    
    this.base;
    
    this.impuesto;
    
    this.tipoFactor; /* catCFDI:c_TipoFactor */
    
    this.tasaOCuota;
    
    this.importe;
    
    
}


function CFDIRelacionado() {
    
    this.UUID;
    
    this.TipoRelacion;
    
}