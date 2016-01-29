
/*
    Recibo de pago de nómina. v1.1.
    Complemento al Comprobante Fiscal Digital a través de Internet (CFDI) para el manejo de datos de Nómina.

    http://www.sat.gob.mx/informacion_fiscal/factura_electronica/Paginas/complemento_nomina.aspx
    http://www.sat.gob.mx/sitio_internet/cfd/nomina/nomina11.xsd

    Aplica para CFDI (versión 3.2)
 */

function Nomina() {

    /* Nodo opcional para expresar las percepciones aplicables */
    this.percepciones = {

        /* Nodo para expresar la información detallada de una percepción */
        percepcion: null, /* array : Percepcion */

        /* Atributo requerido para expresar el total de percepciones gravadas que se relacionan en el comprobante */
        totalGravado: null, /* object : t_Importe() */

        /* Atributo requerido para expresar el total de percepciones exentas que se relacionan en el comprobante */
        totalExento: null /* object : t_Importe() */

    };

    /* Nodo opcional para expresar las deducciones aplicables */
    this.deducciones = {
        /* Nodo para expresar la información detallada de una deducción */
        deduccion : null, /* array : Deduccion() */

        /* Atributo requerido para expresar el total de deducciones gravadas que se relacionan en el comprobante */
        totalGravado: null,

        /* Atributo requerido para expresar el total de deducciones exentas que se relacionan en el comprobante */
        totalExento: null
    };

    /* Nodo opcional para expresar las incapacidades aplicables */
    this.incapacidades = null; /* array : Incapacidad() */

    /* Nodo opcional para expresar las horas extras aplicables */
    this.horasExtras = null; /* array : HoraExtra() */

    /* Atributo requerido para la expresión de la versión del complemento */
    this.version = '1.1';

    /* Atributo opcional para expresar el registro patronal a 20 posiciones máximo */
    this.registroPatronal = null;

    /* Atributo requerido para expresar el número de empleado de 1 a 15 posiciones */
    this.numEmpleado = null;

    /* Atributo requerido para la expresión de la CURP del trabajador */
    this.curp = null; /* object : t_CURP() */

    /* Atributo requerido para la expresión de la clave del régimen por el cual se tiene contratado al trabajador, conforme al catálogo publicado en el portal del SAT en internet */
    this.tipoRegimen = null;

    /* Atributo opcional para la expresión del número de seguridad social aplicable al trabajador */
    this.numSeguridadSocial = null;

    /* Atributo requerido para la expresión de la fecha efectiva de erogación del gasto. Se expresa en la forma aaaa-mm-dd, de acuerdo con la especificación ISO 8601. */
    this.fechaPago = null;

    /* Atributo requerido para la expresión de la fecha inicial del pago. Se expresa en la forma aaaa-mm-dd, de acuerdo con la especificación ISO 8601. */
    this.fechaInicialPago = null;

    /* Atributo requerido para la expresión de la fecha final del pago. Se expresa en la forma aaaa-mm-dd, de acuerdo con la especificación ISO 8601. */
    this.fechaFinalPago = null;

    /* Atributo requerido para la expresión del número de días pagados */
    this.numDiasPagados = null;

    /* Atributo opcional para la expresión del departamento o área a la que pertenece el trabajador */
    this.departamento = null;

    /* Atributo opcional para la expresión de la CLABE */
    this.clabe = null; /* object : t_Clabe() */

    /* Atributo opcional para la expresión del Banco conforme al catálogo; donde se realiza un depósito de nómina */
    this.banco = null;

    /* Atributo opcional para expresar la fecha de inicio de la relación laboral entre el empleador y el empleado */
    this.fechaInicioRelLaboral = null;

    /* Número de semanas que el empleado ha mantenido relación laboral con el empleador */
    this.antiguedad = null;

    /* Puesto asignado al empleado o actividad que realiza */
    this.puesto = null;

    /* Tipo de contrato que tiene el trabajador: Base, Eventual, Confianza, Sindicalizado, a prueba, etc. */
    this.tipoContrato = null;

    /* Tipo de jornada que cubre el trabajador: Diurna, nocturna, mixta, por hora, reducida, continuada, partida, por turnos, etc. */
    this.tipoJornada = null;

    /* Forma en que se establece el pago del salario: diario, semanal, quincenal, catorcenal mensual, bimestral, unidad de obra, comisión, precio alzado, etc. */
    this.periodicidadPago = null;

    /* Retribución otorgada al trabajador, que se integra por los pagos hechos en efectivo por cuota diaria, gratificaciones, percepciones, alimentación, habitación, primas, comisiones, prestaciones en especie y cualquiera otra cantidad o prestación que se entregue al trabajador por su trabajo, sin considerar los conceptos que se excluyen de conformidad con el Artículo 27 de la Ley del Seguro Social. (Se emplea para pagar las cuotas y aportaciones de Seguridad Social). */
    this.salarioBaseCotApor = null;

    /* Clave conforme a la Clase en que deben inscribirse los patrones, de acuerdo a las actividades que desempeñan sus trabajadores, según lo previsto en el artículo 196 del Reglamento en Materia de Afiliación Clasificación de Empresas, Recaudación y Fiscalización. Catálogo publicado en el portal del SAT en internet */
    this.riesgoPuesto = null;

    /* El salario se integra con los pagos hechos en efectivo por cuota diaria, gratificaciones, percepciones, habitación, primas, comisiones, prestaciones en especie y cualquiera otra cantidad o prestación que se entregue al trabajador por su trabajo, de conformidad con el Art. 84 de la Ley Federal del Trabajo. (Se utiliza para el cálculo de las indemnizaciones). */
    this.salarioDiarioIntegrado = null; /* object : t_Importe() */

};

/* contenedor de objetos para nómina */
var _nomina = {
    /* Nodo opcional para expresar información de las incapacidades */
    Incapacidad : function() {

        /* Número de días que el trabajador se incapacitó en el periodo */
        this.diasIncapacidad = null;

        /* Razón de la incapacidad: Catálogo publicado en el portal del SAT en internet */
        this.tipoIncapacidad = null;

        /* Monto del descuento por la incapacidad */
        this.descuento = null; /* object : t_Importe() */

    },

    /* Nodo opcional para expresar información de las horas extras */
    HorasExtra: function() {

        /* Número de días en que el trabajador realizó horas extra en el periodo */
        this.dias = null;

        /* Tipo de pago de las horas extra: dobles o triples */
        this.tipoHoras = null; /* [Dobles,Triples] */

        /* Número de horas extra trabajadas en el periodo */
        this.horasExtra = null;

        /* Importe pagado por las horas extra */
        this.importePagado = null; /* object : t_Importe() */

    },


    /* Nodo para expresar la información detallada de una deducción */
    Deduccion: function() {

        /* Clave agrupadora. Clasifica la deducción conforme al catálogo publicado en el portal del SAT en internet */
        this.tipoDeduccion = null;

        /* Atributo requerido para la clave de deducción de nómina propia de la contabilidad de cada patrón, puede conformarse desde 3 hasta 15 caracteres */
        this.clave = null;

        /* Atributo requerido para la descripción del concepto de deducción */
        this.concepto = null;

        /* Atributo requerido, representa el importe gravado de un concepto de deducción */
        this.importeGravado = null; /* object : t_Importe() */

        /* Atributo requerido, representa el importe exento de un concepto de deducción */
        this.importeExento = null; /* object : t_Importe() */

    },

    Percepcion: function() {

        /* Clave agrupadora. Clasifica la percepción conforme al catálogo publicado en el portal del SAT en internet  */
        this.tipoPercepcion = null; /* pattern: [0-9]{3} */

        /* Atributo requerido, representa la clave de percepción de nómina propia de la contabilidad de cada patrón, puede conformarse desde 3 hasta 15 caracteres */
        this.clave = null;

        /* Atributo requerido para la descripción del concepto de percepción */
        this.concepto = null;

        /* Atributo requerido, representa el importe gravado de un concepto de percepción */
        this.importeGravado = null; /* object : t_Importe() */

        /* Atributo requerido, representa el importe exento de un concepto de percepción */
        this.importeExento = null; /* object : t_Importe() */

    },

    /* Tipo definido para la expresión de una CURP */
    CURP: function() {
        this.curp = null; /* [A-Z][A,E,I,O,U,X][A-Z]{2}[0-9]{2}[0-1][0-9][0-3][0-9][M,H][A-Z]{2}[B,C,D,F,G,H,J,K,L,M,N,Ñ,P,Q,R,S,T,V,W,X,Y,Z]{3}[0-9,A-Z][0-9] */
    },

    /* Tipo definido para expresar importes numéricos con fracción hasta seis decimales */
    Importe: function() {
        this.importe = null;
    },

    /* Tipo definido para expresar la CLABE interbancaria */
    Clabe: function() {
        this.clabe = null; /* [0-9]{18} */
    },

    /*
        Catálogos del complemento de Nómina.
        Régimen de Contratación del trabajador
        http://www.sat.gob.mx/informacion_fiscal/factura_electronica/Documents/catalogo_complemento_nomina_Act.pdf
     */
    regimenContratacion : [

        { clave: 2,  descripcion: 'Sueldos y salarios' },
        { clave: 3,  descripcion: 'Jubilados' },
        { clave: 4,  descripcion: 'Pensionados' },
        { clave: 5,  descripcion: 'Asimilados a salarios, Miembros de las Sociedades Cooperativas de Producción' },
        { clave: 6,  descripcion: 'Asimilados a salarios, Integrantes de Sociedades y Asociaciones Civiles' },
        { clave: 7,  descripcion: 'Asimilados a salarios, Miembros de consejos directivos, de vigilancia, consultivos, honorarios a administradores, comisarios y gerentes generales.' },
        { clave: 8,  descripcion: 'Asimilados a salarios, Actividad empresarial (comisionistas)' },
        { clave: 9,  descripcion: 'Asimilados a salarios, Honorarios asimilados a salarios' },
        { clave: 10, descripcion: 'Asimilados a salarios, Ingresos acciones o títulos valor' }

    ],

    bancos : [

        { clave: '002', nombreCorto: 'BANAMEX',             razonSocial: 'Banco Nacional de México, S.A., Institución de Banca Múltiple, Grupo Financiero Banamex' },
        { clave: '006', nombreCorto: 'BANCOMEXT',           razonSocial: 'Banco Nacional de Comercio Exterior, Sociedad Nacional de Crédito, Institución de Banca de Desarrollo' },
        { clave: '009', nombreCorto: 'BANOBRAS',            razonSocial: 'Banco Nacional de Obras y Servicios Públicos, Sociedad Nacional de Crédito, Institución de Banca de Desarrollo' },
        { clave: '012', nombreCorto: 'BBVA BANCOMER',       razonSocial: 'BBVA Bancomer, S.A., Institución de Banca Múltiple, Grupo Financiero BBVA Bancomer' },
        { clave: '014', nombreCorto: 'SANTANDER',           razonSocial: 'Banco Santander (México), S.A., Institución de Banca Múltiple, Grupo Financiero Santander' },
        { clave: '019', nombreCorto: 'BANJERCITO',          razonSocial: 'Banco Nacional del Ejército, Fuerza Aérea y Armada, Sociedad Nacional de Crédito, Institución de Banca de Desarrollo' },
        { clave: '021', nombreCorto: 'HSBC',                razonSocial: 'HSBC México, S.A., institución De Banca Múltiple, Grupo Financiero HSBC' },
        { clave: '030', nombreCorto: 'BAJIO',               razonSocial: 'Banco del Bajío, S.A., Institución de Banca Múltiple' },
        { clave: '032', nombreCorto: 'IXE',                 razonSocial: 'IXE Banco, S.A., Institución de Banca Múltiple, IXE Grupo Financiero' },
        { clave: '036', nombreCorto: 'INBURSA',             razonSocial: 'Banco Inbursa, S.A., Institución de Banca Múltiple, Grupo Financiero Inbursa' },
        { clave: '037', nombreCorto: 'INTERACCIONES',       razonSocial: 'Banco Interacciones, S.A., Institución de Banca Múltiple' },
        { clave: '042', nombreCorto: 'MIFEL',               razonSocial: 'Banca Mifel, S.A., Institución de Banca Múltiple, Grupo Financiero Mifel' },
        { clave: '044', nombreCorto: 'SCOTIABANK',          razonSocial: 'Scotiabank Inverlat, S.A' },
        { clave: '058', nombreCorto: 'BANREGIO',            razonSocial: 'Banco Regional de Monterrey, S.A., Institución de Banca Múltiple, Banregio Grupo Financiero' },
        { clave: '059', nombreCorto: 'INVEX',               razonSocial: 'Banco Invex, S.A., Institución de Banca Múltiple, Invex Grupo Financiero' },
        { clave: '060', nombreCorto: 'BANSI',               razonSocial: 'Bansi, S.A., Institución de Banca Múltiple' },
        { clave: '062', nombreCorto: 'AFIRME',              razonSocial: 'Banca Afirme, S.A., Institución de Banca Múltiple' },
        { clave: '072', nombreCorto: 'BANORTE',             razonSocial: 'Banco Mercantil del Norte, S.A., Institución de Banca Múltiple, Grupo Financiero Banorte' },
        { clave: '102', nombreCorto: 'THE ROYAL BANK',      razonSocial: 'The Royal Bank of Scotland México, S.A., Institución de Banca Múltiple' },
        { clave: '103', nombreCorto: 'AMERICAN EXPRESS',    razonSocial: 'American Express Bank (México), S.A., Institución de Banca Múltiple' },
        { clave: '106', nombreCorto: 'BAMSA',               razonSocial: 'Bank of America México, S.A., Institución de Banca Múltiple, Grupo Financiero Bank of America' },
        { clave: '108', nombreCorto: 'TOKYO',               razonSocial: 'Bank of Tokyo-Mitsubishi UFJ (México), S.A' },
        { clave: '110', nombreCorto: 'JP MORGAN',           razonSocial: 'Banco J.P. Morgan, S.A., Institución de Banca Múltiple, J.P. Morgan Grupo Financiero' },
        { clave: '112', nombreCorto: 'BMONEX',              razonSocial: 'Banco Monex, S.A., Institución de Banca Múltiple' },
        { clave: '113', nombreCorto: 'VE POR MAS',          razonSocial: 'Banco Ve Por Mas, S.A. Institución de Banca Múltiple' },
        { clave: '116', nombreCorto: 'ING',                 razonSocial: 'ING Bank (México), S.A., Institución de Banca Múltiple, ING Grupo Financiero' },
        { clave: '124', nombreCorto: 'DEUTSCHE',            razonSocial: 'Deutsche Bank México, S.A., Institución de Banca Múltiple' },
        { clave: '126', nombreCorto: 'CREDIT SUISSE',       razonSocial: 'Banco Credit Suisse (México), S.A. Institución de Banca Múltiple, Grupo Financiero Credit Suisse (México)' },
        { clave: '127', nombreCorto: 'AZTECA',              razonSocial: 'Banco Azteca, S.A. Institución de Banca Múltiple.' },
        { clave: '128', nombreCorto: 'AUTOFIN',             razonSocial: 'Banco Autofin México, S.A. Institución de Banca Múltiple' },
        { clave: '129', nombreCorto: 'BARCLAYS',            razonSocial: 'Barclays Bank México, S.A., Institución de Banca Múltiple, Grupo Financiero Barclays México' },
        { clave: '130', nombreCorto: 'COMPARTAMOS',         razonSocial: 'Banco Compartamos, S.A., Institución de Banca Múltiple' },
        { clave: '131', nombreCorto: 'BANCO FAMSA',         razonSocial: 'Banco Ahorro Famsa, S.A., Institución de Banca Múltiple' },
        { clave: '132', nombreCorto: 'BMULTIVA',            razonSocial: 'Banco Multiva, S.A., Institución de Banca Múltiple, Multivalores Grupo Financiero' },
        { clave: '133', nombreCorto: 'ACTINVER',            razonSocial: 'Banco Actinver, S.A. Institución de Banca Múltiple, Grupo Financiero Actinver' },
        { clave: '134', nombreCorto: 'WAL-MART',            razonSocial: 'Banco Wal-Mart de México Adelante, S.A., Institución de Banca Múltiple' },
        { clave: '135', nombreCorto: 'NAFIN',               razonSocial: 'Nacional Financiera, Sociedad Nacional de Crédito, Institución de Banca de Desarrollo' },
        { clave: '136', nombreCorto: 'INTERBANCO',          razonSocial: 'Inter Banco, S.A. Institución de Banca Múltiple' },
        { clave: '137', nombreCorto: 'BANCOPPEL',           razonSocial: 'BanCoppel, S.A., Institución de Banca Múltiple' },
        { clave: '138', nombreCorto: 'ABC CAPITAL',         razonSocial: 'ABC Capital, S.A., Institución de Banca Múltiple' },
        { clave: '139', nombreCorto: 'UBS BANK',            razonSocial: 'UBS Bank México, S.A., Institución de Banca Múltiple, UBS Grupo Financiero' },
        { clave: '140', nombreCorto: 'CONSUBANCO',          razonSocial: 'Consubanco, S.A. Institución de Banca Múltiple' },
        { clave: '141', nombreCorto: 'VOLKSWAGEN',          razonSocial: 'Volkswagen Bank, S.A., Institución de Banca Múltiple' },
        { clave: '143', nombreCorto: 'CIBANCO',             razonSocial: 'CIBanco, S.A' },
        { clave: '145', nombreCorto: 'BBASE',               razonSocial: 'Banco Base, S.A., Institución de Banca Múltiple' },
        { clave: '166', nombreCorto: 'BANSEFI',             razonSocial: 'Banco del Ahorro Nacional y Servicios Financieros, Sociedad Nacional de Crédito, Institución de Banca de Desarrollo' },
        { clave: '168', nombreCorto: 'HIPOTECARIA FEDERAL', razonSocial: 'Sociedad Hipotecaria Federal, Sociedad Nacional de Crédito, Institución de Banca de Desarrollo' },
        { clave: '600', nombreCorto: 'MONEXCB',             razonSocial: 'Monex Casa de Bolsa, S.A. de C.V. Monex Grupo Financiero' },
        { clave: '601', nombreCorto: 'GBM',                 razonSocial: 'GBM Grupo Bursátil Mexicano, S.A. de C.V. Casa de Bolsa' },
        { clave: '602', nombreCorto: 'MASARI',              razonSocial: 'Masari Casa de Bolsa, S.A' },
        { clave: '605', nombreCorto: 'VALUE',               razonSocial: 'Value, S.A. de C.V. Casa de Bolsa' },
        { clave: '606', nombreCorto: 'ESTRUCTURADORES',     razonSocial: 'Estructuradores del Mercado de Valores Casa de Bolsa, S.A. de C.V' },
        { clave: '607', nombreCorto: 'TIBER',               razonSocial: 'Casa de Cambio Tiber, S.A. de C.V' },
        { clave: '608', nombreCorto: 'VECTOR',              razonSocial: 'Vector Casa de Bolsa, S.A. de C.V.' },
        { clave: '610', nombreCorto: 'B&B',                 razonSocial: 'B y B, Casa de Cambio, S.A. de C.V.' },
        { clave: '614', nombreCorto: 'ACCIVAL',             razonSocial: 'Acciones y Valores Banamex, S.A. de C.V., Casa de Bolsa' },
        { clave: '615', nombreCorto: 'MERRILL LYNCH',       razonSocial: 'Merrill Lynch México, S.A. de C.V. Casa de Bolsa' },
        { clave: '616', nombreCorto: 'FINAMEX',             razonSocial: 'Casa de Bolsa Finamex, S.A. de C.V.' },
        { clave: '617', nombreCorto: 'VALMEX',              razonSocial: 'Valores Mexicanos Casa de Bolsa, S.A. de C.V.' },
        { clave: '618', nombreCorto: 'UNICA',               razonSocial: 'Unica Casa de Cambio, S.A. de C.V.' },
        { clave: '619', nombreCorto: 'MAPFRE',              razonSocial: 'MAPFRE Tepeyac, S.A.' },
        { clave: '620', nombreCorto: 'PROFUTURO',           razonSocial: 'Profuturo G.N.P., S.A. de C.V., Afore' },
        { clave: '621', nombreCorto: 'CB ACTINVER',         razonSocial: 'Actinver Casa de Bolsa, S.A. de C.V.' },
        { clave: '622', nombreCorto: 'OACTIN',              razonSocial: 'OPERADORA ACTINVER, S.A. DE C.V' },
        { clave: '623', nombreCorto: 'SKANDIA',             razonSocial: 'Skandia Vida, S.A. de C.V.' },
        { clave: '626', nombreCorto: 'CBDEUTSCHE',          razonSocial: 'Deutsche Securities, S.A. de C.V. CASA DE BOLSA' },
        { clave: '627', nombreCorto: 'ZURICH',              razonSocial: 'Zurich Compañía de Seguros, S.A.' },
        { clave: '628', nombreCorto: 'ZURICHVI',            razonSocial: 'Zurich Vida, Compañía de Seguros, S.A.' },
        { clave: '629', nombreCorto: 'SU CASITA',           razonSocial: 'Hipotecaria Su Casita, S.A. de C.V. SOFOM ENR' },
        { clave: '630', nombreCorto: 'CB INTERCAM I',       razonSocial: 'Intercam Casa de Bolsa, S.A. de C.V.' },
        { clave: '631', nombreCorto: 'CI BOLSA',            razonSocial: 'CI Casa de Bolsa, S.A. de C.V.' },
        { clave: '632', nombreCorto: 'BULLTICK CB ',        razonSocial: 'Bulltick Casa de Bolsa, S.A., de C.V.' },
        { clave: '633', nombreCorto: 'STERLING',            razonSocial: 'Sterling Casa de Cambio, S.A. de C.V.' },
        { clave: '634', nombreCorto: 'FINCOMUN',            razonSocial: 'Fincomún, Servicios Financieros Comunitarios, S.A. de C.V.' },
        { clave: '636', nombreCorto: 'HDI SEGUROS',         razonSocial: 'HDI Seguros, S.A. de C.V.' },
        { clave: '637', nombreCorto: 'ORDER',               razonSocial: 'Order Express Casa de Cambio, S.A. de C.V' },
        { clave: '638', nombreCorto: 'AKALA',               razonSocial: 'Akala, S.A. de C.V., Sociedad Financiera Popular' },
        { clave: '640', nombreCorto: 'CB JPMORGAN',         razonSocial: 'J.P. Morgan Casa de Bolsa, S.A. de C.V. J.P. Morgan Grupo Financiero' },
        { clave: '642', nombreCorto: 'REFORMA',             razonSocial: 'Operadora de Recursos Reforma, S.A. de C.V., S.F.P.' },
        { clave: '646', nombreCorto: 'STP',                 razonSocial: 'Sistema de Transferencias y Pagos STP, S.A. de C.V.SOFOM ENR' },
        { clave: '647', nombreCorto: 'TELECOMM',            razonSocial: 'Telecomunicaciones de México' },
        { clave: '648', nombreCorto: 'EVERCORE',            razonSocial: 'Evercore Casa de Bolsa, S.A. de C.V.' },
        { clave: '649', nombreCorto: 'SKANDIA',             razonSocial: 'Skandia Operadora de Fondos, S.A. de C.V.' },
        { clave: '651', nombreCorto: 'SEGMTY',              razonSocial: 'Seguros Monterrey New York Life, S.A de C.V' },
        { clave: '652', nombreCorto: 'ASEA',                razonSocial: 'Solución Asea, S.A. de C.V., Sociedad Financiera Popular' },
        { clave: '653', nombreCorto: 'KUSPIT',              razonSocial: 'Kuspit Casa de Bolsa, S.A. de C.V.' },
        { clave: '655', nombreCorto: 'SOFIEXPRESS',         razonSocial: 'J.P. SOFIEXPRESS, S.A. de C.V., S.F.P.' },
        { clave: '656', nombreCorto: 'UNAGRA',              razonSocial: 'UNAGRA, S.A. de C.V., S.F.P.' },
        { clave: '659', nombreCorto: 'OPCIONES EMPRESARIALES DEL NOROESTE', razonSocial: 'OPCIONES EMPRESARIALES DEL NORESTE, S.A. DE C.V., S.F.P.' },
        { clave: '901', nombreCorto: 'CLS',                 razonSocial: 'Cls Bank International' },
        { clave: '902', nombreCorto: 'INDEVAL',             razonSocial: 'SD. Indeval, S.A. de C.V.' },
        { clave: '670', nombreCorto: 'LIBERTAD',            razonSocial: 'Libertad Servicios Financieros, S.A. De C.V.' }

    ],

    riesgoPuesto : [

        { clave: 1, descripcion: 'Clase I'   },
        { clave: 2, descripcion: 'Clase II'  },
        { clave: 3, descripcion: 'Clase III' },
        { clave: 4, descripcion: 'Clase IV'  },
        { clave: 5, descripcion: 'Clase V'   }

    ],

    /*
        Estos elementos sólo serán utilizados por Entidades Federativas, Municipios o
        demarcaciones territoriales del Distrito Federal, organismos autónomos y entidades
        paraestatales y paramunicipales.
    */
    tipoPercepcion : [

        { clave: '001', descripcion: 'Sueldos, Salarios Rayas y Jornales' },
        { clave: '002', descripcion: 'Gratificación Anual (Aguinaldo)' },
        { clave: '003', descripcion: 'Participación de los Trabajadores en las Utilidades PTU' },
        { clave: '004', descripcion: 'Reembolso de Gastos Médicos Dentales y Hospitalarios' },
        { clave: '005', descripcion: 'Fondo de Ahorro' },
        { clave: '006', descripcion: 'Caja de ahorro' },
        { clave: '009', descripcion: 'Contribuciones a Cargo del Trabajador Pagadas por el Patrón' },
        { clave: '010', descripcion: 'Premios por puntualidad' },
        { clave: '011', descripcion: 'Prima de Seguro de vida' },
        { clave: '012', descripcion: 'Seguro de Gastos Médicos Mayores' },
        { clave: '013', descripcion: 'Cuotas Sindicales Pagadas por el Patrón' },
        { clave: '014', descripcion: 'Subsidios por incapacidad' },
        { clave: '015', descripcion: 'Becas para trabajadores y/o hijos' },
        { clave: '016', descripcion: 'Otros' },
        { clave: '017', descripcion: 'Subsidio para el empleo' },
        { clave: '019', descripcion: 'Horas extra' },
        { clave: '020', descripcion: 'Prima dominical' },
        { clave: '021', descripcion: 'Prima vacacional' },
        { clave: '022', descripcion: 'Prima por antigüedad' },
        { clave: '023', descripcion: 'Pagos por separación' },
        { clave: '024', descripcion: 'Seguro de retiro' },
        { clave: '025', descripcion: 'Indemnizaciones' },
        { clave: '026', descripcion: 'Reembolso por funeral' },
        { clave: '027', descripcion: 'Cuotas de seguridad social pagadas por el patrón' },
        { clave: '028', descripcion: 'Comisiones' },
        { clave: '029', descripcion: 'Vales de despensa' },
        { clave: '030', descripcion: 'Vales de restaurante' },
        { clave: '031', descripcion: 'Vales de gasolina' },
        { clave: '032', descripcion: 'Vales de ropa' },
        { clave: '033', descripcion: 'Ayuda para renta' },
        { clave: '034', descripcion: 'Ayuda para artículos escolares' },
        { clave: '035', descripcion: 'Ayuda para anteojos' },
        { clave: '036', descripcion: 'Ayuda para transporte' },
        { clave: '037', descripcion: 'Ayuda para gastos de funeral' },
        { clave: '038', descripcion: 'Otros ingresos por salarios' },
        { clave: '039', descripcion: 'Jubilaciones, pensiones o haberes de retiro' },
        { clave: '040', descripcion: 'Ingreso pagado por Entidades Federativas, municipios o demarcaciones territoriales del Distrito Federal, organismos autónomos y entidades paraestatales y paramunicipales con cargo a sus participaciones u otros ingresos locales.' },
        { clave: '041', descripcion: 'Ingreso pagado por Entidades Federativas, municipios o demarcaciones territoriales del Distrito Federal, organismos autónomos y entidades paraestatales y paramunicipales con recursos federales, distintos a las participaciones.' },
        { clave: '042', descripcion: 'Ingreso pagado por Entidades Federativas, municipios o demarcaciones territoriales del Distrito Federal, organismos autónomos y entidades paraestatales y paramunicipales con cargo a sus participaciones u otros ingresos locales y con recursos federales distintos a las participaciones.' }

    ],

    tipoDeduccion : [

        { clave: '001', descripcion: 'Seguridad social', comentario: '' },
        { clave: '002', descripcion: 'ISR', comentario: '' },
        { clave: '003', descripcion: 'Aportaciones a retiro, cesantía en edad avanzada y vejez.', comentario: '' },
        { clave: '004', descripcion: 'Otros', comentario: '' },
        { clave: '005', descripcion: 'Aportaciones a Fondo de vivienda', comentario: '' },
        { clave: '006', descripcion: 'Descuento por incapacidad', comentario: 'Sumatoria de los valores de los atributos Descuento del nodo Incapacidad' },
        { clave: '007', descripcion: 'Pensión alimenticia', comentario: '' },
        { clave: '008', descripcion: 'Renta', comentario: '' },
        { clave: '009', descripcion: 'Préstamos provenientes del Fondo Nacional de la Vivienda para los Trabajadores', comentario: '' },
        { clave: '010', descripcion: 'Pago por crédito de vivienda', comentario: '' },
        { clave: '011', descripcion: 'Pago de abonos INFONACOT', comentario: '' },
        { clave: '012', descripcion: 'Anticipo de salarios', comentario: '' },
        { clave: '013', descripcion: 'Pagos hechos con exceso al trabajador', comentario: '' },
        { clave: '014', descripcion: 'Errores', comentario: '' },
        { clave: '015', descripcion: 'Pérdidas', comentario: '' },
        { clave: '016', descripcion: 'Averías', comentario: '' },
        { clave: '017', descripcion: 'Adquisición de artículos producidos por la empresa o establecimiento', comentario: '' },
        { clave: '018', descripcion: 'Cuotas para la constitución y fomento de sociedades cooperativas y de cajas de ahorro', comentario: '' },
        { clave: '019', descripcion: 'Cuotas sindicales', comentario: '' },
        { clave: '020', descripcion: 'Ausencia (Ausentismo)', comentario: '' },
        { clave: '021', descripcion: 'Cuotas obrero patronales', comentario: '' }

    ],

    tiposIncapacidad : [

        { clave: 1, descripcion: 'Riesgo de trabajo' },
        { clave: 2, descripcion: 'Enfermedad en general' },
        { clave: 3, descripcion: 'Maternidad' }

    ]
};
