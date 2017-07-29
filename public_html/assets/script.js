var app = angular.module('CFDIapp', []);

app.controller('CDFICtrl', function ($scope) {
    
    $scope.cfdis = new Array();
    $scope.certificados = new Array();
    $scope.agrupaciones = new Array();
    
    $scope.resumen = {
        totalImpuestosRetenidos   : 0,
        totalImpuestosTrasladados : 0,
        subtotal                  : 0,
        total                     : 0
    };
    
    $scope.nuevoConcepto = function(conceptoJson) {
        var concepto = new _comprobante.Concepto();

        /* información aduanera : PRUEBAS */
        if (conceptoJson.InformacionAduanera) {
            var informacionAduanera = new _comprobante.InformacionAduanera();
            informacionAduanera.numero = conceptoJson.InformacionAduanera.numero;
            informacionAduanera.fecha  = conceptoJson.InformacionAduanera.fecha;
            informacionAduanera.aduana = conceptoJson.InformacionAduanera.aduana ? conceptoJson.InformacionAduanera.aduana : null;

            concepto.informacionAduanera = informacionAduanera;
        } else {
            concepto.informacionAduanera = null;
        }

        /* cuenta predial : PRUEBAS */
        if (conceptoJson.CuentaPredial)
            concepto.cuentaPredial.numero = conceptoJson.CuentaPredial ? conceptoJson.CuentaPredial.numero : null;
        else 
            concepto.cuentaPredial = null;

        /* complemento concepto : PENDIENTE DESARROLLO */
        /* http://www.sat.gob.mx/informacion_fiscal/factura_electronica/Paginas/complementos_factura_cfdi.aspx */
        if (conceptoJson.ComplementoConcepto) {

        }

        /* parte : PRUEBAS */
        if (conceptoJson.Parte) {

            /* parte : información aduanera */
            if (conceptoJson.Parte.InformacionAduanera) {
                informacionAduanera = new _comprobante.InformacionAduanera();
                informacionAduanera.numero = conceptoJson.InformacionAduanera.numero;
                informacionAduanera.fecha  = conceptoJson.InformacionAduanera.fecha;
                informacionAduanera.aduana = conceptoJson.InformacionAduanera.aduana ? conceptoJson.InformacionAduanera.aduana : null;

                concepto.parte.informacionAduanera = informacionAduanera;
            }

            concepto.parte.cantidad         = conceptoJson.Parte.cantidad;
            concepto.parte.unidad           = conceptoJson.Parte.unidad           ? conceptoJson.Parte.unidad           : null;
            concepto.parte.noIdentificacion = conceptoJson.Parte.noIdentificacion ? conceptoJson.Parte.noIdentificacion : null;
            concepto.parte.descripcion      = conceptoJson.Parte.descripcion;
            concepto.parte.valorUnitario    = conceptoJson.Parte.valorUnitario    ? conceptoJson.Parte.valorUnitario    : null;
            concepto.parte.importe          = conceptoJson.Parte.importe          ? concepto.Json.Parte.importe          : null;

        } else {
            concepto.parte = null;
        }

        concepto.cantidad         = conceptoJson.cantidad;
        concepto.unidad           = conceptoJson.unidad;
        concepto.noIdentificacion = conceptoJson.noIdentificacion ? conceptoJson.noIdentificacion : null;
        concepto.descripcion      = conceptoJson.descripcion;
        concepto.valorUnitario    = conceptoJson.valorUnitario;
        concepto.importe          = conceptoJson.importe;

        return concepto;
    };
    
    
    $scope.cargarComprobantes = function () {
        for (var c in $scope.cfdis) {
            var comprobante = new Comprobante();
            var json = $scope.cfdis[c];

            /* ID interno */
            /* ============================================================================================= */
            comprobante.id = $scope.certificados.length;
            
            /* Revisión de versiones */
            if (json.version) {
                if (json.version === '3.2') {
                    comprobante = $scope.cargarVersion32(comprobante, json);
                    
                } else if (json.version === '3.3') {
                    comprobante = cargarVersion33(comprobante, json);
                }
            }

            /* Se guarda todo */
            /* ============================================================================================= */
            $scope.certificados.push(comprobante);
            
            
            $scope.resumen.total                     += parseFloat(comprobante.total);
            $scope.resumen.subtotal                  += parseFloat(comprobante.subTotal);
            $scope.resumen.totalImpuestosRetenidos   += parseFloat(comprobante.impuestos.totalImpuestosRetenidos);
            $scope.resumen.totalImpuestosTrasladados += parseFloat(comprobante.impuestos.totalImpuestosTrasladados);
            
        }
        
        $scope.cfdis = new Array();
    };
    
    $scope.cargarVersion33 = function(comprobante, json) {
        
        /* CFDIs relacionados */
        if (json.CfdiRelacionados) {
            for (var c in json.CfdiRelacionados) {
                _cfdi = json.Impuestos[c];
            }
        }
        
        /* emisor */
        if (json.Emisor) {
            comprobante.emisor.rfc = json.Emisor.Rfc;
            comprobante.emisor.nombre = json.Emisor.Nombre;
            comprobante.emisor.regimenFiscal = json.Emisor.RegimenFiscal;
        }
        
        /* receptor */
        if (json.Receptor) {
            comprobante.receptor.rfc = json.Receptor.Rfc;
            comprobante.receptor.nombre = json.Receptor.Nombre;
            comprobante.residenciaFiscal = json.Receptor.ResidenciaFiscal;
            comprobante.numRegIdTrib = json.Receptor.NumRegIdTrib;
            comprobante.usoCFDI = json.Receptor.Usocfdi;
        }
        
        /* impuestos */
        if (json.Impuestos) {
            for (var i in json.Impuestos) {
                _impuesto = json.Impuestos[i];
            }
        }
        
        /* conceptos */
        if (json.Conceptos) {
            for (var c in json.Conceptos) {
                _concepto = json.Conceptos[c];
            }
        }
        
        /* addenda */
        if (json.Addenda) {
            for (var c in json.Conceptos) {
                _addenda = json.Conceptos[c];
            }
        }
        
        
        comprobante.version = json.version;
        comprobante.serie = json.serie;
        comprobante.folio = json.folio;
        comprobante.fecha = json.fecha;
        comprobante.sello = json.sello;
        comprobante.formatoPago = json.formaDePago;
        comprobante.noCertificado = json.noCertificado;
        comprobante.certificado = json.certificado;
        comprobante.condicionesDePago = json.condicionesDePago;
        comprobante.subTotal = json.subTotal;
        comprobante.descuento = json.descuento;
        comprobante.moneda = json.moneda;
        comprobante.tipoCambio = json.tipoCambio;
        comprobante.total = json.total;
        comprobante.tipoComprobante = json.tipocomprobante;
        comprobante.metodoPago = json.metodoDePago;
        comprobante.lugarExpedicion = json.LugarExpedicion;
        comprobante.confirmacion = json.confirmacion;
        
        
    };
    
    $scope.cargarVersion32 = function(comprobante, json) {
                    /* Complemento */
            /* http://www.sat.gob.mx/informacion_fiscal/factura_electronica/Paginas/complementos_factura_cfdi.aspx */
            /* ============================================================================================= */
            
            comprobante.complemento = json.Complemento ? json.Complemento : null;
            
            /* CASO: Timbre fiscal */
            if (json.Complemento.TimbreFiscalDigital) {
                comprobante.complemento.timbreFiscalDigital = new TimbreFiscalDigital();
                comprobante.complemento.timbreFiscalDigital.version          = json.Complemento.TimbreFiscalDigital.version;
                comprobante.complemento.timbreFiscalDigital.UUID             = json.Complemento.TimbreFiscalDigital.UUID;
                comprobante.complemento.timbreFiscalDigital.fechaTimbrado    = json.Complemento.TimbreFiscalDigital.FechaTimbrado;
                comprobante.complemento.timbreFiscalDigital.selloCFD         = json.Complemento.TimbreFiscalDigital.selloCFD;
                comprobante.complemento.timbreFiscalDigital.noCertificadoSAT = json.Complemento.TimbreFiscalDigital.noCertificadoSAT;
                comprobante.complemento.timbreFiscalDigital.selloSAT         = json.Complemento.TimbreFiscalDigital.selloSAT;
            }
            
            /* CASO: Nomina */
            if (json.Complemento.Nomina) {
                var nomina  = new Nomina();
                var jNomina = json.Complemento.Nomina;
                
                /* Percepciones */
                if (jNomina.Percepciones) {
                    nomina.percepciones.totalGravado = jNomina.Percepciones.TotalGravado;
                    nomina.percepciones.totalExento  = jNomina.Percepciones.TotalExento;

                    nomina.percepciones.percepcion = new Array();
                    var percepcion;

                    if (Array.isArray(jNomina.Percepciones.Percepcion)) {
                        for (var p in jNomina.Percepciones.Percepcion) {
                            percepcion = new _nomina.Percepcion();
                            percepcion.tipoPercepcion = jNomina.Percepciones.Percepcion[p].TipoPercepcion;
                            percepcion.clave          = jNomina.Percepciones.Percepcion[p].Clave;
                            percepcion.concepto       = jNomina.Percepciones.Percepcion[p].Concepto;
                            percepcion.importeGravado = jNomina.Percepciones.Percepcion[p].ImporteGravado;
                            percepcion.importeExento  = jNomina.Percepciones.Percepcion[p].ImporteExento;
                            nomina.percepciones.percepcion.push(percepcion);
                        }

                    } else {
                        percepcion = new _nomina.Percepcion();
                        percepcion.tipoPercepcion = jNomina.Percepciones.Percepcion.TipoPercepcion;
                        percepcion.clave          = jNomina.Percepciones.Percepcion.Clave;
                        percepcion.concepto       = jNomina.Percepciones.Percepcion.Concepto;
                        percepcion.importeGravado = jNomina.Percepciones.Percepcion.ImporteGravado;
                        percepcion.importeExento  = jNomina.Percepciones.Percepcion.ImporteExento;
                        nomina.percepciones.percepcion.push(percepcion);
                    }
                }
                
                /* Deducciones */
                if (jNomina.Deducciones) {
                    nomina.deducciones.totalGravado = jNomina.Deducciones.TotalGravado;
                    nomina.deducciones.totalExento  = jNomina.Deducciones.TotalExento;
                    
                    nomina.deducciones.deduccion = new Array();
                    var deduccion;
                    
                    if (Array.isArray(jNomina.Deducciones.Deduccion)) {
                        for (var d in jNomina.Deducciones.Deduccion) {
                            deduccion = new _nomina.Deduccion();
                            deduccion.tipoDeduccion  = jNomina.Deducciones.Deduccion[d].TipoDeduccion;
                            deduccion.clave          = jNomina.Deducciones.Deduccion[d].Clave;
                            deduccion.concepto       = jNomina.Deducciones.Deduccion[d].Concepto;
                            deduccion.importeGravado = jNomina.Deducciones.Deduccion[d].ImporteGravado;
                            deduccion.importeExento  = jNomina.Deducciones.Deduccion[d].ImporteExento;
                            nomina.deducciones.deduccion.push(deduccion);
                            
                        }
                    } else {
                        deduccion = new _nomina.Deduccion();
                        deduccion.tipoDeduccion  = jNomina.Deducciones.Deduccion.TipoDeduccion;
                        deduccion.clave          = jNomina.Deducciones.Deduccion.Clave;
                        deduccion.concepto       = jNomina.Deducciones.Deduccion.Concepto;
                        deduccion.importeGravado = jNomina.Deducciones.Deduccion.ImporteGravado;
                        deduccion.importeExento  = jNomina.Deducciones.Deduccion.ImporteExento;
                        nomina.deducciones.deduccion.push(deduccion);
                    }                    
                }
                
                /* Incapacidades */
                if (jNomina.Incapacidades) {
                    var incapacidad;
                    nomina.incapacidades = new Array();
                    
                    if (Array.isArray(jNomina.Incapacidades)) {
                        for (var i in jNomina.Incapacidades) {
                            incapacidad = new _nomina.Incapacidad();
                            incapacidad.diasIncapacidad = jNomina.Incapacidades[i].DiasIncapacidad;
                            incapacidad.tipoIncapacidad = jNomina.Incapacidades[i].TipoIncapacidad;
                            incapacidad.descuento       = jNomina.Incapacidades[i].Descuento;
                            nomina.incapacidades.push(incapacidad);
                        }
                    } else {
                        incapacidad = new _nomina.Incapacidad();
                        incapacidad.diasIncapacidad = jNomina.Incapacidades.DiasIncapacidad;
                        incapacidad.tipoIncapacidad = jNomina.Incapacidades.TipoIncapacidad;
                        incapacidad.descuento       = jNomina.Incapacidades.Descuento;
                        nomina.incapacidades.push(incapacidad);
                    }
                }
                
                /* Horas extra */
                if (jNomina.HorasExtra) {
                    var horaExtra;
                    nomina.horasExtra = new Array();
                    
                    if (Array.isArray(jNomina.HorasExtra)) {
                        for (var h in jNomina.HorasExtra) {
                            horaExtra = new _nomina.HoraExtra();
                            horaExtra.dias          = jNomina.HorasExtra[h].Dias;
                            horaExtra.tipoHoras     = jNomina.HorasExtra[h].TipoHoras;
                            horaExtra.horasExtra    = jNomina.HorasExtra[h].HorasExtra;
                            horaExtra.importePagado = jNomina.HorasExtra[h].ImportePagado;
                            nomina.horasExtra.push(horaExtra);
                        }
                    } else {
                        horaExtra = new _nomina.HoraExtra();
                        horaExtra.dias          = jNomina.HorasExtra.Dias;
                        horaExtra.tipoHoras     = jNomina.HorasExtra.TipoHoras;
                        horaExtra.horasExtra    = jNomina.HorasExtra.HorasExtra;
                        horaExtra.importePagado = jNomina.HorasExtra.ImportePagado;
                        nomina.horasExtra.push(horaExtra);
                    }
                }
                
                /* Detalles */
                nomina.registroPatronal       = jNomina.RegistroPatronal       ? jNomina.RegistroPatronal : null;
                nomina.numEmpleado            = jNomina.NumEmpleado;
                nomina.curp                   = jNomina.Curp;
                nomina.tipoRegimen            = jNomina.TipoRegimen;
                nomina.numSeguridadSocial     = jNomina.NumSeguridadSocial     ? jNomina.NumSeguridadSocial : null;
                nomina.fechaPago              = jNomina.FechaPago;
                nomina.fechaInicialPago       = jNomina.FechaInicialPago;
                nomina.fechaFinalPago         = jNomina.FechaFinalPago;
                nomina.numDiasPagados         = jNomina.NumDiasPagados;
                nomina.departamento           = jNomina.Departamento           ? jNomina.Departamento : null;
                nomina.clabe                  = jNomina.Clabe                  ? jNomina.Clabe : null;
                nomina.banco                  = jNomina.Banco                  ? jNomina.Banco : null;
                nomina.fechaInicioRelLaboral  = jNomina.FechaInicioRelLaboral  ? jNomina.FechaInicioRelLaboral : null;
                nomina.antiguedad             = jNomina.Antiguedad             ? jNomina.Antiguedad : null;
                nomina.puesto                 = jNomina.Puesto                 ? jNomina.Puesto : null;
                nomina.tipoContrato           = jNomina.TipoContrato           ? jNomina.TipoContrato : null;
                nomina.tipoJornada            = jNomina.TipoJornada            ? jNomina.TipoJornada : null;
                nomina.periodicidadPago       = jNomina.PeriodicidadPago       ? jNomina.PeriodicidadPago : null;
                nomina.salarioBaseCotApor     = jNomina.SalarioBaseCotApor     ? jNomina.SalarioBaseCotApor : null;
                nomina.riesgoPuesto           = jNomina.RiesgoPuesto           ? jNomina.RiesgoPuesto : null;
                nomina.salarioDiarioIntegrado = jNomina.SalarioDiarioIntegrado ? jNomina.SalarioDiarioIntegrado : null;
            } else {
                nomina = null;
            }
            
            comprobante.complemento.nomina = nomina;
            

            /* Addenda */
            /* ============================================================================================= */
            comprobante.addenda = json.Addenda ? json.Addenda : null;


            /* Información variada del comprobante */
            /* ============================================================================================= */
            comprobante.version              = json.version;
            comprobante.serie                = json.serie ? json.serie : null;
            comprobante.folio                = json.folio ? json.folio : null;

            comprobante.noCertificado        = json.noCertificado;
            comprobante.certificado          = json.certificado;
            comprobante.fecha                = json.fecha;
            comprobante.sello                = json.sello;

            comprobante.formaDePago          = json.formaDePago;
            comprobante.metodoDePago         = json.metodoDePago;
            comprobante.condicionesDePago    = json.condicionesDePago ? json.condicionesDePago : null;
            
            comprobante.tipoDeComprobante    = json.tipoDeComprobante;
            comprobante.numCtaPago           = json.NumCtaPago ? json.NumCtaPago : null;
            
            comprobante.total                = json.total;
            comprobante.subTotal             = json.subTotal;

            comprobante.descuento            = json.descuento       ? json.descuento : null;
            comprobante.motivoDescuento      = json.motivoDescuento ? json.motivoDescuento : null;

            comprobante.tipoCambio           = json.tipoCambio ? json.tipoCambio : null;
            comprobante.moneda               = json.moneda     ? json.moneda : null;

            comprobante.lugarExpedicion      = json.LugarExpedicion;

            comprobante.folioFiscalOrig      = json.folioFiscalOrig      ? json.folioFiscalOrig      : null;
            comprobante.serieFolioFiscalOrig = json.serieFolioFiscalOrig ? json.serieFolioFiscalOrig : null;
            comprobante.fechaFolioFiscalOrig = json.fechaFolioFiscalOrig ? json.fechaFolioFiscalOrig : null;
            comprobante.montoFolioFiscalOrig = json.montoFolioFiscalOrig ? json.montoFolioFiscalOrig : null;


            /* Emisor */
            /* ============================================================================================= */

            /* domicilio fiscal */
            if (json.Emisor.DomicilioFiscal) {
                comprobante.emisor.domicilioFiscal = new _comprobante.UbicacionFiscal();
                comprobante.emisor.domicilioFiscal.calle        = json.Emisor.DomicilioFiscal.calle        ? json.Emisor.DomicilioFiscal.calle        : null;
                comprobante.emisor.domicilioFiscal.noExterior   = json.Emisor.DomicilioFiscal.noExterior   ? json.Emisor.DomicilioFiscal.noExterior   : null;
                comprobante.emisor.domicilioFiscal.noInterior   = json.Emisor.DomicilioFiscal.noInterior   ? json.Emisor.DomicilioFiscal.noInterior   : null;
                comprobante.emisor.domicilioFiscal.colonia      = json.Emisor.DomicilioFiscal.colonia      ? json.Emisor.DomicilioFiscal.colonia      : null;
                comprobante.emisor.domicilioFiscal.localidad    = json.Emisor.DomicilioFiscal.localidad    ? json.Emisor.DomicilioFiscal.localidad    : null;
                comprobante.emisor.domicilioFiscal.referencia   = json.Emisor.DomicilioFiscal.referencia   ? json.Emisor.DomicilioFiscal.referencia   : null;
                comprobante.emisor.domicilioFiscal.municipio    = json.Emisor.DomicilioFiscal.municipio    ? json.Emisor.DomicilioFiscal.municipio    : null;
                comprobante.emisor.domicilioFiscal.estado       = json.Emisor.DomicilioFiscal.estado       ? json.Emisor.DomicilioFiscal.estado       : null;
                comprobante.emisor.domicilioFiscal.pais         = json.Emisor.DomicilioFiscal.pais;
                comprobante.emisor.domicilioFiscal.codigoPostal = json.Emisor.DomicilioFiscal.codigoPostal ? json.Emisor.DomicilioFiscal.codigoPostal : null;
            }

            /* expedido en */
            if (json.Emisor.ExpedidoEn) {
                comprobante.emisor.expedidoEn = new _comprobante.Ubicacion();
                comprobante.emisor.expedidoEn.calle        = json.Emisor.ExpedidoEn.calle        ? json.Emisor.ExpedidoEn.calle        : null;
                comprobante.emisor.expedidoEn.noExterior   = json.Emisor.ExpedidoEn.noExterior   ? json.Emisor.ExpedidoEn.noExterior   : null;
                comprobante.emisor.expedidoEn.noInterior   = json.Emisor.ExpedidoEn.noInterior   ? json.Emisor.ExpedidoEn.noInterior   : null;
                comprobante.emisor.expedidoEn.colonia      = json.Emisor.ExpedidoEn.colonia      ? json.Emisor.ExpedidoEn.colonia      : null;
                comprobante.emisor.expedidoEn.localidad    = json.Emisor.ExpedidoEn.localidad    ? json.Emisor.ExpedidoEn.localidad    : null;
                comprobante.emisor.expedidoEn.referencia   = json.Emisor.ExpedidoEn.referencia   ? json.Emisor.ExpedidoEn.referencia   : null;
                comprobante.emisor.expedidoEn.municipio    = json.Emisor.ExpedidoEn.municipio    ? json.Emisor.ExpedidoEn.municipio    : null;
                comprobante.emisor.expedidoEn.estado       = json.Emisor.ExpedidoEn.estado       ? json.Emisor.ExpedidoEn.estado       : null;
                comprobante.emisor.expedidoEn.pais         = json.Emisor.ExpedidoEn.pais;
                comprobante.emisor.expedidoEn.codigoPostal = json.Emisor.ExpedidoEn.codigoPostal ? json.Emisor.ExpedidoEn.codigoPostal : null;
            }

            /* regimen fiscal */
            comprobante.emisor.regimenFiscal = new Array();

            if (Array.isArray(json.Emisor.RegimenFiscal))
                for (var r in json.Emisor.RegimenFiscal)
                    comprobante.emisor.regimenFiscal.push(json.Emisor.RegimenFiscal[r].Regimen);
            else 
                comprobante.emisor.regimenFiscal.push(json.Emisor.RegimenFiscal.Regimen);


            comprobante.emisor.rfc    = json.Emisor.rfc;
            comprobante.emisor.nombre = json.Emisor.nombre;

            /* Receptor */
            /* ============================================================================================= */

            /* domicilio */
            if (json.Receptor.Domicilio) {
                comprobante.receptor.domicilio = new _comprobante.Ubicacion();
                comprobante.receptor.domicilio.calle        = json.Receptor.Domicilio.calle        ? json.Receptor.Domicilio.calle        : null;
                comprobante.receptor.domicilio.noExterior   = json.Receptor.Domicilio.noExterior   ? json.Receptor.Domicilio.noExterior   : null;
                comprobante.receptor.domicilio.noInterior   = json.Receptor.Domicilio.noInterior   ? json.Receptor.Domicilio.noInterior   : null;
                comprobante.receptor.domicilio.colonia      = json.Receptor.Domicilio.colonia      ? json.Receptor.Domicilio.colonia      : null;
                comprobante.receptor.domicilio.localidad    = json.Receptor.Domicilio.localidad    ? json.Receptor.Domicilio.localidad    : null;
                comprobante.receptor.domicilio.referencia   = json.Receptor.Domicilio.referencia   ? json.Receptor.Domicilio.referencia   : null;
                comprobante.receptor.domicilio.municipio    = json.Receptor.Domicilio.municipio    ? json.Receptor.Domicilio.municipio    : null;
                comprobante.receptor.domicilio.estado       = json.Receptor.Domicilio.estado       ? json.Receptor.Domicilio.estado       : null;
                comprobante.receptor.domicilio.pais         = json.Receptor.Domicilio.pais;
                comprobante.receptor.domicilio.codigoPostal = json.Receptor.Domicilio.codigoPostal ? json.Receptor.Domicilio.codigoPostal : null;
            }

            /* rfc */
            comprobante.receptor.rfc = json.Receptor.rfc;

            /* nombre */
            comprobante.receptor.nombre = json.Receptor.nombre ? json.Receptor.nombre : null;


            /* Concepto */
            /* ============================================================================================= */
            comprobante.conceptos = new Array();

            if (Array.isArray(json.Conceptos.Concepto)) {
                for (var c in json.Conceptos.Concepto) {
                    comprobante.conceptos.push($scope.nuevoConcepto(json.Conceptos.Concepto[c]));
                }
            } else {
                comprobante.conceptos.push($scope.nuevoConcepto(json.Conceptos.Concepto));
            }


            /* Impuestos */
            /* ============================================================================================= */

            /* retenciones */
            if (json.Impuestos.Retenciones) {
                comprobante.impuestos.retenciones = new Array();
                var retenciones = json.Impuestos.Retenciones.Retencion, 
                    retencion;

                if (Array.isArray(retenciones)) {
                    for (var r in retenciones) {
                        retencion = new _comprobante.Retencion();
                        retencion.impuesto = retenciones[r].impuesto;
                        retencion.importe  = retenciones[r].importe;
                        retencion.tasa     = retenciones[r].tasa;

                        comprobante.impuestos.retenciones.push(retencion);
                    }
                } else {
                    retencion = new _comprobante.Retencion();
                    retencion.impuesto = retenciones.impuesto;
                    retencion.importe  = retenciones.importe;
                    retencion.tasa     = retenciones.tasa;

                    comprobante.impuestos.retenciones.push(retencion);
                }
            }

            /* traslados */
            if (json.Impuestos.Traslados) {
                comprobante.impuestos.traslados = new Array();
                var traslados = json.Impuestos.Traslados.Traslado, 
                    traslado;

                if (Array.isArray(traslados)) {
                    for (var t in traslados) {
                        traslado = new _comprobante.Traslado();
                        traslado.impuesto = traslados[t].impuesto;
                        traslado.importe  = traslados[t].importe;
                        traslado.tasa     = traslados[t].tasa;

                        comprobante.impuestos.traslados.push(traslado);
                    }
                } else {
                    traslado = new _comprobante.Traslado();
                    traslado.impuesto = traslados.impuesto;
                    traslado.importe  = traslados.importe;
                    traslado.tasa     = traslados.tasa;

                    comprobante.impuestos.traslados.push(traslado);
                }
            }

            /* totales */
            comprobante.impuestos.totalImpuestosRetenidos   = json.Impuestos.totalImpuestosRetenidos   ? json.Impuestos.totalImpuestosRetenidos   : 0;
            comprobante.impuestos.totalImpuestosTrasladados = json.Impuestos.totalImpuestosTrasladados ? json.Impuestos.totalImpuestosTrasladados : 0;
    }
    
}).directive("files", function () {
    return {
        scope: {
            files: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var archivo, archivos = changeEvent.target.files, cfdis = new Array();
                
                for (var i = 0; i < archivos.length; i++) {
                    archivo = archivos[i];
                    
                    if (!(archivo.type === 'text/xml')) { continue; }

                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        cfdis.push($.xml2json(jQuery.parseXML(loadEvent.target.result)));
                        
                        if (i === archivos.length)
                            scope.$apply(function () {
                                scope.files = cfdis;
                            });
                    };
                    
                    reader.readAsText(archivo);
                }
            });
        }
    };
}).directive('drop', function () {
    return {
        restrict: 'A',
        scope: {
            drop: '='
        },
        link: function (scope, element, attrs) {
            var processDragOverOrEnter, getDataTransfer;
            
            getDataTransfer = function(event) {
                var dataTransfer;
                return dataTransfer = event.dataTransfer || event.originalEvent.dataTransfer;
            };
            
            processDragOverOrEnter = function (event) {
                if (event != null) event.preventDefault();
                getDataTransfer(event).effectAllowed = 'copy';
                return false;
            };
            
            element.bind('dragover', processDragOverOrEnter);
            element.bind('dragenter', processDragOverOrEnter);
            
            return element.bind('drop', function (event) {
                var archivo, 
                    archivos = getDataTransfer(event).files,
                    cfdis = new Array();
                
                for (var i = 0; i < archivos.length; i++) {
                    archivo = archivos[i];
                    
                    if (!(archivo.type === 'text/xml')) { continue; }

                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        cfdis.push($.xml2json(jQuery.parseXML(loadEvent.target.result)));
                        
                        if (i === archivos.length)
                            scope.$apply(function () {
                                scope.drop = cfdis;
                            });
                    };
                    
                    reader.readAsText(archivo);
                }
                
                return false;
            });
        }
    };
    
}).filter('nominaTipoPercepcion', function() {
    return function(input) {
        if (input === "" || input === null) {
            return "";
        }
        
        for (var t in _nomina.tipoPercepcion) {
            if (_nomina.tipoPercepcion[t].clave === input) {
                return _nomina.tipoPercepcion[t].descripcion;
            }
        }
    };
    
}).filter('nominaTipoDeduccion', function() {
    return function(input) {
        if (input === "" || input === null) {
            return "";
        }
        
        for (var t in _nomina.tipoDeduccion) {
            if (_nomina.tipoDeduccion[t].clave === input) {
                return _nomina.tipoDeduccion[t].descripcion;
            }
        }
    };
    
}).filter('nominaRiesgoPuesto', function() {
    return function(input) {
        if (input === "" || input === null) {
            return "";
        }
        
        for (var t in _nomina.riesgoPuesto) {
            if (_nomina.riesgoPuesto[t].clave == input) {
                return _nomina.riesgoPuesto[t].descripcion;
            }
        }
    };
    
}).filter('nominaRegimenContratacion', function() {
    return function(input) {
        if (input === "" || input === null) {
            return "";
        }
        
        for (var t in _nomina.regimenContratacion) {
            if (_nomina.regimenContratacion[t].clave == input) {
                return _nomina.regimenContratacion[t].descripcion;
            }
        }
    };
});


