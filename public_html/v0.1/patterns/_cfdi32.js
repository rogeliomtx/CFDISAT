
/* Estándar de Comprobante fiscal digital a través de Internet. */
var Comprobante = [{
    
    /* REQUERIDO. Nodo requerido para expresar la información del contribuyente emisor del comprobante. */
    Emisor : {
        
        /* OPCIONAL. Nodo opcional para precisar la información de ubicación del domicilio fiscal del contribuyente emisor */
        DomicilioFiscal : new t_UbicacionFiscal(),
        
        /* OPCIONAL. Nodo opcional para precisar la información de ubicación del domicilio en donde es emitido el comprobante fiscal en caso de que sea distinto del domicilio fiscal del contribuyente emisor. */
        ExpedidoEn : new t_Ubicacion(),
        
        /* REQUERIDO. Nodo requerido para incorporar los regímenes en los que tributa el contribuyente emisor. Puede contener más de un régimen. */
        RegimenFiscal : [
            /* Atributo requerido para incorporar el nombre del régimen en el que tributa el contribuyente emisor. */
            { Regimen : null }
        ],
        
        /* REQUERIDO. Atributo requerido para la Clave del Registro Federal de Contribuyentes correspondiente al contribuyente emisor del comprobante sin guiones o espacios. */
        rfc: new t_RFC(),
        
        /* OPCIONAL. Atributo opcional para el nombre, denominación o razón social del contribuyente emisor del comprobante. */    
        nombre: null
    },
    
    /* REQUERIDO. Nodo requerido para precisar la información del contribuyente receptor del comprobante. */
    Receptor: {
        
        /*  OPCIONAL. Nodo opcional para la definición de la ubicación donde se da el domicilio del receptor del comprobante fiscal. */
        Domicilio: [ new t_Ubicacion() ],
        
        /* REQUERIDO. Atributo requerido para precisar la Clave del Registro Federal de Contribuyentes correspondiente al contribuyente receptor del comprobante. */
        rfc: new t_RFC(),
        
        /* OPCIONAL. Atributo opcional para el nombre, denominación o razón social del contribuyente receptor del comprobante. */
        nombre: null
    },
    
    /* REQUERIDO. Nodo requerido para enlistar los conceptos cubiertos por el comprobante. */
    Conceptos : [{
            
        /* Nodo para introducir la información detallada de un bien o servicio amparado en el comprobante. */
        Concepto: {
            
            /* <choice> */
            
            /* OPCIONAL. Nodo opcional para introducir la información aduanera aplicable cuando se trate de ventas de primera mano de mercancías importadas. */
            InformacionAduanera: new t_InformacionAduanera(),
            
            /* OPCIONAL. Nodo opcional para asentar el número de cuenta predial con el que fue registrado el inmueble, en el sistema catastral de la entidad federativa de que trate, o bien para incorporar los datos de identificación del certificado de participación inmobiliaria no amortizable. */
            CuentaPredial: {
                
                /* REQUERIDO. Atributo requerido para precisar el número de la cuenta predial del inmueble cubierto por el presente concepto, o bien para incorporar los datos de identificación del certificado de participación inmobiliaria no amortizable, tratándose de arrendamiento. */
                numero: null
            },
            
            /* OPCIONAL. Nodo opcional donde se incluirán los nodos complementarios de extensión al concepto, definidos por el SAT, de acuerdo a disposiciones particulares a un sector o actividad especifica. */
            ComplementoConcepto: [{
                
            }],
            
            /* OPCIONAL. Nodo opcional para expresar las partes o componentes que integran la totalidad del concepto expresado en el comprobante fiscal digital a través de Internet */
            Parte: {
                
                /* Nodo opcional para introducir la información aduanera aplicable cuando se trate de partes o componentes importados vendidos de primera mano. */
                InformacionAduanera: [
                    new t_InformacionAduanera()
                ], 
                
                /* Atributo requerido para precisar la cantidad de bienes o servicios del tipo particular definido por la presente parte. */
                cantidad: null,
                
                /* Atributo opcional para precisar la unidad de medida aplicable para la cantidad expresada en la parte. */
                unidad: null,
                
                /* Atributo opcional para expresar el número de serie del bien o identificador del servicio amparado por la presente parte. */
                noIdentificacion: null,
                
                /* Atributo requerido para precisar la descripción del bien o servicio cubierto por la presente parte. */
                descripcion: null,
                
                /* Atributo opcional para precisar el valor o precio unitario del bien o servicio cubierto por la presente parte. */
                valorUnitario: new t_Importe(),
                
                /* Atributo opcional para precisar el importe total de los bienes o servicios de la presente parte. Debe ser equivalente al resultado de multiplicar la cantidad por el valor unitario expresado en la parte. */
                importe: new t_Importe()
            },
            
            /* </choice> */
            
            /* Atributo requerido para precisar la cantidad de bienes o servicios del tipo particular definido por el presente concepto. */
            cantidad: null,
            
            /* Atributo requerido para precisar la unidad de medida aplicable para la cantidad expresada en el concepto. */
            unidad: null,
            
            /* Atributo opcional para expresar el número de serie del bien o identificador del servicio amparado por el presente concepto. */
            noIdentificacion: null,
            
            /* Atributo requerido para precisar la descripción del bien o servicio cubierto por el presente concepto. */
            descripcion: null,
            
            /* Atributo requerido para precisar el valor o precio unitario del bien o servicio cubierto por el presente concepto. */
            valorUnitario: new t_Importe(),
            
            /* Atributo requerido para precisar el importe total de los bienes o servicios del presente concepto. Debe ser equivalente al resultado de multiplicar la cantidad por el valor unitario expresado en el concepto. */
            importe: new t_Importe()
        }
    }],

    /* Nodo requerido para capturar los impuestos aplicables. */
    Impuestos: {
        
        /* Nodo opcional para capturar los impuestos retenidos aplicables */
        Retenciones: [{
                
            /* Nodo para la información detallada de una retención de impuesto específico */
            Retencion: {
                
                /* Atributo requerido para señalar el tipo de impuesto retenido */
                impuesto: null, /* [ISR,IVA] ISR: Impuesto sobre la renta; IVA: Impuesto al Valor Agregado; */
                
                /* Atributo requerido para señalar el importe o monto del impuesto retenido */
                importe: new t_Importe()
            }
        }],
    
        /* Nodo opcional para asentar o referir los impuestos trasladados aplicables */
        Traslados: [{
            
            /* Nodo para la información detallada de un traslado de impuesto específico */
            Traslado: {
                
                /* Atributo requerido para señalar el tipo de impuesto trasladado */
                impuesto: null, /* [] IVA: Impuesto al Valor Agregado; IEPS: Impuesto especial sobre productos y servicios; */
                
                /* Atributo requerido para señalar la tasa del impuesto que se traslada por cada concepto amparado en el comprobante */
                tasa: new t_Importe(),
                
                /* Atributo requerido para señalar el importe del impuesto trasladado */
                importe: new t_Importe()
            }
        }],
    
        /* Atributo opcional para expresar el total de los impuestos retenidos que se desprenden de los conceptos expresados en el comprobante fiscal digital a través de Internet. */
        totalImpuestosRetenidos: new t_Importe(),
        
        /* Atributo opcional para expresar el total de los impuestos trasladados que se desprenden de los conceptos expresados en el comprobante fiscal digital a través de Internet. */
        totalImpuestosTrasladados: new t_Importe(),
        
        /* Nodo opcional donde se incluirá el complemento Timbre Fiscal Digital de manera obligatoria y los nodos complementarios determinados por el SAT, de acuerdo a las disposiciones particulares a un sector o actividad específica. */
        Complemento: [{
                
        }],
        
        /* Nodo opcional para recibir las extensiones al presente formato que sean de utilidad al contribuyente. Para las reglas de uso del mismo, referirse al formato de origen. */
        Addenda: [{
                
        }],
    
        /* Atributo requerido con valor prefijado a 3.2 que indica la versión del estándar bajo el que se encuentra expresado el comprobante. */
        version: '3.2',
        
        /* Atributo opcional para precisar la serie para control interno del contribuyente. Este atributo acepta una cadena de caracteres alfabéticos de 1 a 25 caracteres */
        serie: null,
        
        /* Atributo opcional para control interno del contribuyente que acepta un valor numérico entero superior a 0 que expresa el folio del comprobante. */
        folio: null,
        
        /* Atributo requerido para la expresión de la fecha y hora de expedición del comprobante fiscal. Se expresa en la forma aaaa-mm-ddThh:mm:ss, de acuerdo con la especificación ISO 8601. */
        fecha: null,
        
        /* Atributo requerido para contener el sello digital del comprobante fiscal, al que hacen referencia las reglas de resolución miscelánea aplicable. El sello deberá ser expresado cómo una cadena de texto en formato Base 64. */
        sello: null,
        
        /* Atributo requerido para precisar la forma de pago que aplica para este comprobnante fiscal digital a través de Internet. Se utiliza para expresar Pago en una sola exhibición o número de parcialidad pagada contra el total de parcialidades, Parcialidad 1 de X. */
        formaDePago: null,
        
        /* Atributo requerido para expresar el número de serie del certificado de sello digital que ampara al comprobante, de acuerdo al acuse correspondiente a 20 posiciones otorgado por el sistema del SAT. */
        noCertificado: null,
        
        /* Atributo requerido que sirve para expresar el certificado de sello digital que ampara al comprobante como texto, en formato base 64. */
        certificado: null,
        
        /* Atributo opcional para expresar las condiciones comerciales aplicables para el pago del comprobante fiscal digital a través de Internet. */
        condicionesDePago: null,
        
        /* Atributo requerido para representar la suma de los importes antes de descuentos e impuestos. */
        subTotal: new t_Importe(),
        
        /* Atributo opcional para representar el importe total de los descuentos aplicables antes de impuestos. */
        descuento: new t_Importe(),
        
        /* Atributo opcional para expresar el motivo del descuento aplicable. */
        motivoDescuento: null,
        
        /* Atributo opcional para representar el tipo de cambio conforme a la moneda usada */
        TipoCambio: null,
        
        /* Atributo opcional para expresar la moneda utilizada para expresar los montos */
        Moneda: null,
        
        /* Atributo requerido para representar la suma del subtotal, menos los descuentos aplicables, más los impuestos trasladados, menos los impuestos retenidos. */
        total: new t_Importe(),
        
        /* Atributo requerido para expresar el efecto del comprobante fiscal para el contribuyente emisor. */
        tipoDeComprobante: null, /* [ingreso,egreso,traslado] */
        
        /* Atributo requerido de texto libre para expresar el método de pago de los bienes o servicios amparados por el comprobante. Se entiende como método de pago leyendas tales como: cheque, tarjeta de crédito o debito, depósito en cuenta, etc. */
        metodoDePago: null,
        
        /* Atributo requerido para incorporar el lugar de expedición del comprobante. */
        LugarExpedicion: null,
        
        /* Atributo Opcional para incorporar al menos los cuatro últimos digitos del número de cuenta con la que se realizó el pago. */
        NumCtaPago: null, /* (4-*) */
        
        /* Atributo opcional para señalar el número de folio fiscal del comprobante que se hubiese expedido por el valor total del comprobante, tratándose del pago en parcialidades. */
        FolioFiscalOrig: null,
        
        /* Atributo opcional para señalar la serie del folio del comprobante que se hubiese expedido por el valor total del comprobante, tratándose del pago en parcialidades. */
        SerieFolioFiscalOrig: null,
        
        /* Atributo opcional para señalar la fecha de expedición del comprobante que se hubiese emitido por el valor total del comprobante, tratándose del pago en parcialidades. Se expresa en la forma aaaa-mm-ddThh:mm:ss, de acuerdo con la especificación ISO 8601. */
        FechaFolioFiscalOrig: null,
        
        /* Atributo opcional para señalar el total del comprobante que se hubiese expedido por el valor total de la operación, tratándose del pago en parcialidades */
        MontoFolioFiscalOrig: new t_Importe()
    }
}];

/* Tipo definido para expresar domicilios o direcciones */
function t_Ubicacion() {
    
    /* Este atributo opcional sirve para precisar la avenida, calle, camino o carretera donde se da la ubicación. */
    this.calle = null;
    
    /* Este atributo opcional sirve para expresar el número particular en donde se da la ubicación sobre una calle dada. */
    this.noExterior = null;
    
    /* Este atributo opcional sirve para expresar información adicional para especificar la ubicación cuando calle y número exterior (noExterior) no resulten suficientes para determinar la ubicación de forma precisa. */
    this.noInterior = null;
    
    /* Este atributo opcional sirve para precisar la colonia en donde se da la ubicación cuando se desea ser más específico en casos de ubicaciones urbanas. */
    this.colonia = null;
    
    /* Atributo opcional que sirve para precisar la ciudad o población donde se da la ubicación. */
    this.localidad = null;
    
    /* Atributo opcional para expresar una referencia de ubicación adicional. */
    this.referencia = null;
    
    /* Atributo opcional que sirve para precisar el municipio o delegación (en el caso del Distrito Federal) en donde se da la ubicación. */
    this.municipio = null;
    
    /* Atributo opcional que sirve para precisar el estado o entidad federativa donde se da la ubicación. */
    this.estado = null;
    
    /* Atributo requerido que sirve para precisar el país donde se da la ubicación. */
    this.pais = null;
    
    /* Atributo opcional que sirve para asentar el código postal en donde se da la ubicación. */
    this.codigoPostal = null;
    
};

/* Tipo definido para expresar domicilios o direcciones */
function t_UbicacionFiscal() {
    
    /* Este atributo requerido sirve para precisar la avenida, calle, camino o carretera donde se da la ubicación. */
    this.calle = null;
    
    /* Este atributo opcional sirve para expresar el número particular en donde se da la ubicación sobre una calle dada. */
    this.noExterior = null;
    
    /* Este atributo opcional sirve para expresar información adicional para especificar la ubicación cuando calle y número exterior (noExterior) no resulten suficientes para determinar la ubicación de forma precisa. */
    this.noInterior = null;
    
    /* Este atributo opcional sirve para precisar la colonia en donde se da la ubicación cuando se desea ser más específico en casos de ubicaciones urbanas. */
    this.colonia = null;
    
    /* Atributo opcional que sirve para precisar la ciudad o población donde se da la ubicación. */
    this.localidad = null;
    
    /* Atributo opcional para expresar una referencia de ubicación adicional. */
    this.referencia = null;
    
    /* Atributo requerido que sirve para precisar el municipio o delegación (en el caso del Distrito Federal) en donde se da la ubicación. */
    this.municipio = null;
    
    /* Atributo requerido que sirve para precisar el estado o entidad federativa donde se da la ubicación. */
    this.estado = null;
    
    /* Atributo requerido que sirve para precisar el país donde se da la ubicación. */
    this.pais = null;
    
    /* Atributo requerido que sirve para asentar el código postal en donde se da la ubicación. */
    this.codigoPostal = null;
    
};

/* Tipo definido para expresar claves del Registro Federal de Contribuyentes */
/* pattern: [A-Z,Ñ,&]{3,4}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z,0-9]?[A-Z,0-9]?[0-9,A-Z]? */
function t_RFC() {
    this.rfc = null;
    /* (12-13) */
}
    
/* Tipo definido para expresar importes numéricos con fracción hasta seis decimales */
function t_Importe() {
    this.importe = -1;
}

/* Tipo definido para expresar información aduanera */
function t_InformacionAduanera() {
    
    /* Atributo requerido para expresar el número del documento aduanero que ampara la importación del bien. */
    this.numero = null;
    
    /* Atributo requerido para expresar la fecha de expedición del documento aduanero que ampara la importación del bien. Se expresa en el formato aaaa-mm-dd */
    this.fecha = null;
    
    /* Atributo opcional para precisar el nombre de la aduana por la que se efectuó la importación del bien. */
    this.aduana= null;
};