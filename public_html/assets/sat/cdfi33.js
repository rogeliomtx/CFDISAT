
/* Estándar de Comprobante Fiscal Digital por Internet. */


function Comprobante() {
    
    /* OPCIONAL. Nodo opcional para precisar la información de los comprobantes relacionados. */
    this.cfdiRelacionados = []; /* object: CFDIRelacionado() */
    
    this.emisor = {
        
        rfc: null,
        
        nombre: null,
        
        /* catCFDI:c_RegimenFiscal */
        regimenFiscal: null,
        
    }
    
    this.receptor = {
        
        rfc: null,
        
        nombre: null, 
        
        /* catCFDI:c_Pais */
        residenciaFiscal: null,
        
        
        
    }
    
}

/* REQUERIDO. Nodo requerido para precisar la información de los comprobantes relacionados. */
function CFDIRelacionado() {
    
    /* REQUERIDO. Atributo requerido para registrar el folio fiscal (UUID) de un CFDI relacionado con el presente comprobante, por ejemplo: Si el CFDI relacionado es un comprobante de traslado que sirve para registrar el movimiento de la mercancía. Si este comprobante se usa como nota de crédito o nota de débito del comprobante relacionado. Si este comprobante es una devolución sobre el comprobante relacionado. Si éste sustituye a una factura cancelada. */
    this.UUID = null;
    
    /* Atributo requerido para indicar la clave de la relación que existe entre éste que se esta generando y el o los CFDI previos. */
    this.tipoRelacion = null;
    
}



    "xs:element": {
      "-name": "Comprobante",
      "xs:annotation": {
        "xs:documentation": "
                Estándar de Comprobante Fiscal Digital por Internet.
            "
      },
      "xs:complexType": {
        "xs:sequence": {
          "xs:element": [
            {
              "-name": "Emisor",
              "xs:annotation": {
                "xs:documentation": "
                            Nodo requerido para expresar la información del contribuyente emisor del comprobante.
                        "
              },
              "xs:complexType": {
                "xs:attribute": [
                  {
                    "-name": "Rfc",
                    "-type": "tdCFDI:t_RFC",
                    "-use": "required",
                    "xs:annotation": {
                      "xs:documentation": "
                                    Atributo requerido para registrar la Clave del Registro Federal de Contribuyentes correspondiente al contribuyente emisor del comprobante.
                                "
                    }
                  },
                  {
                    "-name": "Nombre",
                    "-use": "optional",
                    "xs:annotation": {
                      "xs:documentation": "
                                    Atributo opcional para registrar el nombre, denominación o razón social del contribuyente emisor del comprobante.
                                "
                    },
                    "xs:simpleType": {
                      "xs:restriction": {
                        "-base": "xs:string",
                        "xs:minLength": { "-value": "1" },
                        "xs:maxLength": { "-value": "254" },
                        "xs:whiteSpace": { "-value": "collapse" },
                        "xs:pattern": {
                          "-value": "[^|]{1, 254}"
                        }
                      }
                    }
                  },
                  {
                    "-name": "RegimenFiscal",
                    "-use": "required",
                    "-type": "catCFDI:c_RegimenFiscal",
                    "xs:annotation": {
                      "xs:documentation": "
                                    Atributo requerido para incorporar la clave del régimen del contribuyente emisor al que aplicará el efecto fiscal de este comprobante.
                                "
                    }
                  }
                ]
              }
            },
            {
              "-name": "Receptor",
              "xs:annotation": {
                "xs:documentation": "
                            Nodo requerido para precisar la información del contribuyente receptor del comprobante.
                        "
              },
              "xs:complexType": {
                "xs:attribute": [
                  {
                    "-name": "Rfc",
                    "-use": "required",
                    "-type": "tdCFDI:t_RFC",
                    "xs:annotation": {
                      "xs:documentation": "
                                    Atributo requerido para precisar la Clave del Registro Federal de Contribuyentes correspondiente al contribuyente receptor del comprobante.
                                "
                    }
                  },
                  {
                    "-name": "Nombre",
                    "-use": "optional",
                    "xs:annotation": {
                      "xs:documentation": "
                                    Atributo opcional para precisar el nombre, denominación o razón social del contribuyente receptor del comprobante.
                                "
                    },
                    "xs:simpleType": {
                      "xs:restriction": {
                        "-base": "xs:string",
                        "xs:minLength": { "-value": "1" },
                        "xs:maxLength": { "-value": "254" },
                        "xs:whiteSpace": { "-value": "collapse" },
                        "xs:pattern": {
                          "-value": "[^|]{1, 254}"
                        }
                      }
                    }
                  },
                  {
                    "-name": "ResidenciaFiscal",
                    "-use": "optional",
                    "-type": "catCFDI:c_Pais",
                    "xs:annotation": {
                      "xs:documentation": "
                                    Atributo condicional para registrar la clave del país de residencia para efectos fiscales del receptor del comprobante, cuando se trate de un extranjero, y que es conforme con la especificación ISO 3166-1 alpha-3. Es requerido cuando se incluya el complemento de comercio exterior o se registre el atributo NumRegIdTrib.
                                "
                    }
                  },
                  {
                    "-name": "NumRegIdTrib",
                    "-use": "optional",
                    "xs:annotation": {
                      "xs:documentation": "
                                    Atributo condicional para expresar el número de registro de identidad fiscal del receptor cuando sea residente en el extranjero. Es requerido cuando se incluya el complemento de comercio exterior.
                                "
                    },
                    "xs:simpleType": {
                      "xs:restriction": {
                        "-base": "xs:string",
                        "xs:minLength": { "-value": "1" },
                        "xs:maxLength": { "-value": "40" },
                        "xs:whiteSpace": { "-value": "collapse" }
                      }
                    }
                  },
                  {
                    "-name": "UsoCFDI",
                    "-use": "required",
                    "-type": "catCFDI:c_UsoCFDI",
                    "xs:annotation": {
                      "xs:documentation": "
                                    Atributo requerido para expresar la clave del uso que dará a esta factura el receptor del CFDI.
                                "
                    }
                  }
                ]
              }
            },
            {
              "-name": "Conceptos",
              "xs:annotation": {
                "xs:documentation": "
                            Nodo requerido para listar los conceptos cubiertos por el comprobante.
                        "
              },
              "xs:complexType": {
                "xs:sequence": {
                  "xs:element": {
                    "-name": "Concepto",
                    "-maxOccurs": "unbounded",
                    "xs:annotation": {
                      "xs:documentation": "
                                        Nodo requerido para registrar la información detallada de un bien o servicio amparado en el comprobante.
                                    "
                    },
                    "xs:complexType": {
                      "xs:sequence": {
                        "xs:element": [
                          {
                            "-name": "Impuestos",
                            "-minOccurs": "0",
                            "xs:annotation": {
                              "xs:documentation": "
                                                    Nodo opcional para capturar los impuestos aplicables al presente concepto. Cuando un concepto no registra un impuesto, implica que no es objeto del mismo.
                                                "
                            },
                            "xs:complexType": {
                              "xs:sequence": {
                                "xs:element": [
                                  {
                                    "-name": "Traslados",
                                    "-minOccurs": "0",
                                    "xs:annotation": {
                                      "xs:documentation": "
                                                                Nodo opcional para asentar los impuestos trasladados aplicables al presente concepto.
                                                            "
                                    },
                                    "xs:complexType": {
                                      "xs:sequence": {
                                        "xs:element": {
                                          "-name": "Traslado",
                                          "-maxOccurs": "unbounded",
                                          "xs:annotation": {
                                            "xs:documentation": "
                                                                            Nodo requerido para asentar la información detallada de un traslado de impuestos aplicable al presente concepto.
                                                                        "
                                          },
                                          "xs:complexType": {
                                            "xs:attribute": [
                                              {
                                                "-name": "Base",
                                                "-use": "required",
                                                "xs:annotation": {
                                                  "xs:documentation": "
                                                                                    Atributo requerido para señalar la base para el cálculo del impuesto, la determinación de la base se realiza de acuerdo con las disposiciones fiscales vigentes. No se permiten valores negativos.
                                                                                "
                                                },
                                                "xs:simpleType": {
                                                  "xs:restriction": {
                                                    "-base": "xs:decimal",
                                                    "xs:fractionDigits": { "-value": "6" },
                                                    "xs:minInclusive": { "-value": "0.000001" },
                                                    "xs:whiteSpace": { "-value": "collapse" }
                                                  }
                                                }
                                              },
                                              {
                                                "-name": "Impuesto",
                                                "-use": "required",
                                                "-type": "catCFDI:c_Impuesto",
                                                "xs:annotation": {
                                                  "xs:documentation": "
                                                                                    Atributo requerido para señalar la clave del tipo de impuesto trasladado aplicable al concepto.
                                                                                "
                                                }
                                              },
                                              {
                                                "-name": "TipoFactor",
                                                "-use": "required",
                                                "-type": "catCFDI:c_TipoFactor",
                                                "xs:annotation": {
                                                  "xs:documentation": "
                                                                                    Atributo requerido para señalar la clave del tipo de factor que se aplica a la base del impuesto.
                                                                                "
                                                }
                                              },
                                              {
                                                "-name": "TasaOCuota",
                                                "-use": "optional",
                                                "xs:annotation": {
                                                  "xs:documentation": "
                                                                                    Atributo condicional para señalar el valor de la tasa o cuota del impuesto que se traslada para el presente concepto. Es requerido cuando el atributo TipoFactor tenga una clave que corresponda a Tasa o Cuota.
                                                                                "
                                                },
                                                "xs:simpleType": {
                                                  "xs:restriction": {
                                                    "-base": "xs:decimal",
                                                    "xs:fractionDigits": { "-value": "6" },
                                                    "xs:minInclusive": { "-value": "0.000000" },
                                                    "xs:whiteSpace": { "-value": "collapse" }
                                                  }
                                                }
                                              },
                                              {
                                                "-name": "Importe",
                                                "-use": "optional",
                                                "-type": "tdCFDI:t_Importe",
                                                "xs:annotation": {
                                                  "xs:documentation": "
                                                                                    Atributo condicional para señalar el importe del impuesto trasladado que aplica al concepto. No se permiten valores negativos. Es requerido cuando TipoFactor sea Tasa o Cuota
                                                                                "
                                                }
                                              }
                                            ]
                                          }
                                        }
                                      }
                                    }
                                  },
                                  {
                                    "-name": "Retenciones",
                                    "-minOccurs": "0",
                                    "xs:annotation": {
                                      "xs:documentation": "
                                                                Nodo opcional para asentar los impuestos retenidos aplicables al presente concepto.
                                                            "
                                    },
                                    "xs:complexType": {
                                      "xs:sequence": {
                                        "xs:element": {
                                          "-name": "Retencion",
                                          "-maxOccurs": "unbounded",
                                          "xs:annotation": {
                                            "xs:documentation": "
                                                                            Nodo requerido para asentar la información detallada de una retención de impuestos aplicable al presente concepto.
                                                                        "
                                          },
                                          "xs:complexType": {
                                            "xs:attribute": [
                                              {
                                                "-name": "Base",
                                                "-use": "required",
                                                "xs:annotation": {
                                                  "xs:documentation": "
                                                                                    Atributo requerido para señalar la base para el cálculo de la retención, la determinación de la base se realiza de acuerdo con las disposiciones fiscales vigentes. No se permiten valores negativos.
                                                                                "
                                                },
                                                "xs:simpleType": {
                                                  "xs:restriction": {
                                                    "-base": "xs:decimal",
                                                    "xs:fractionDigits": { "-value": "6" },
                                                    "xs:minInclusive": { "-value": "0.000001" },
                                                    "xs:whiteSpace": { "-value": "collapse" }
                                                  }
                                                }
                                              },
                                              {
                                                "-name": "Impuesto",
                                                "-use": "required",
                                                "-type": "catCFDI:c_Impuesto",
                                                "xs:annotation": {
                                                  "xs:documentation": "
                                                                                    Atributo requerido para señalar la clave del tipo de impuesto retenido aplicable al concepto.
                                                                                "
                                                }
                                              },
                                              {
                                                "-name": "TipoFactor",
                                                "-use": "required",
                                                "-type": "catCFDI:c_TipoFactor",
                                                "xs:annotation": {
                                                  "xs:documentation": "
                                                                                    Atributo requerido para señalar la clave del tipo de factor que se aplica a la base del impuesto.
                                                                                "
                                                }
                                              },
                                              {
                                                "-name": "TasaOCuota",
                                                "-use": "required",
                                                "xs:annotation": {
                                                  "xs:documentation": "
                                                                                    Atributo requerido para señalar la tasa o cuota del impuesto que se retiene para el presente concepto.
                                                                                "
                                                },
                                                "xs:simpleType": {
                                                  "xs:restriction": {
                                                    "-base": "xs:decimal",
                                                    "xs:whiteSpace": { "-value": "collapse" },
                                                    "xs:minInclusive": { "-value": "0.000000" },
                                                    "xs:fractionDigits": { "-value": "6" }
                                                  }
                                                }
                                              },
                                              {
                                                "-name": "Importe",
                                                "-use": "required",
                                                "-type": "tdCFDI:t_Importe",
                                                "xs:annotation": {
                                                  "xs:documentation": "
                                                                                    Atributo requerido para señalar el importe del impuesto retenido que aplica al concepto. No se permiten valores negativos.
                                                                                "
                                                }
                                              }
                                            ]
                                          }
                                        }
                                      }
                                    }
                                  }
                                ]
                              }
                            }
                          },
                          {
                            "-name": "InformacionAduanera",
                            "-minOccurs": "0",
                            "-maxOccurs": "unbounded",
                            "xs:annotation": {
                              "xs:documentation": "
                                                    Nodo opcional para introducir la información aduanera aplicable cuando se trate de ventas de primera mano de mercancías importadas o se trate de operaciones de comercio exterior con bienes o servicios.
                                                "
                            },
                            "xs:complexType": {
                              "xs:attribute": {
                                "-name": "NumeroPedimento",
                                "-use": "required",
                                "xs:annotation": {
                                  "xs:documentation": "
                                                            Atributo requerido para expresar el número del pedimento que ampara la importación del bien que se expresa en el siguiente formato: últimos 2 dígitos del año de validación seguidos por dos espacios, 2 dígitos de la aduana de despacho seguidos por dos espacios, 4 dígitos del número de la patente seguidos por dos espacios, 1 dígito que corresponde al último dígito del año en curso, salvo que se trate de un pedimento consolidado iniciado en el año inmediato anterior o del pedimento original de una rectificación, seguido de 6 dígitos de la numeración progresiva por aduana.
                                                        "
                                },
                                "xs:simpleType": {
                                  "xs:restriction": {
                                    "-base": "xs:string",
                                    "xs:length": { "-value": "21" },
                                    "xs:pattern": {
                                      "-value": "[0-9]{2} [0-9]{2} [0-9]{4} [0-9]{7}"
                                    }
                                  }
                                }
                              }
                            }
                          },
                          {
                            "-name": "CuentaPredial",
                            "-minOccurs": "0",
                            "xs:annotation": {
                              "xs:documentation": "
                                                    Nodo opcional para asentar el número de cuenta predial con el que fue registrado el inmueble, en el sistema catastral de la entidad federativa de que trate, o bien para incorporar los datos de identificación del certificado de participación inmobiliaria no amortizable.
                                                "
                            },
                            "xs:complexType": {
                              "xs:attribute": {
                                "-name": "Numero",
                                "-use": "required",
                                "xs:annotation": {
                                  "xs:documentation": "
                                                            Atributo requerido para precisar el número de la cuenta predial del inmueble cubierto por el presente concepto, o bien para incorporar los datos de identificación del certificado de participación inmobiliaria no amortizable, tratándose de arrendamiento.
                                                        "
                                },
                                "xs:simpleType": {
                                  "xs:restriction": {
                                    "-base": "xs:string",
                                    "xs:minLength": { "-value": "1" },
                                    "xs:maxLength": { "-value": "150" },
                                    "xs:whiteSpace": { "-value": "collapse" },
                                    "xs:pattern": {
                                      "-value": "[0-9]{1, 150}"
                                    }
                                  }
                                }
                              }
                            }
                          },
                          {
                            "-name": "ComplementoConcepto",
                            "-minOccurs": "0",
                            "xs:annotation": {
                              "xs:documentation": "
                                                    Nodo opcional donde se incluyen los nodos complementarios de extensión al concepto definidos por el SAT, de acuerdo con las disposiciones particulares para un sector o actividad específica.
                                                "
                            },
                            "xs:complexType": {
                              "xs:sequence": {
                                "xs:any": { "-maxOccurs": "unbounded" }
                              }
                            }
                          },
                          {
                            "-name": "Parte",
                            "-minOccurs": "0",
                            "-maxOccurs": "unbounded",
                            "xs:annotation": {
                              "xs:documentation": "
                                                    Nodo opcional para expresar las partes o componentes que integran la totalidad del concepto expresado en el comprobante fiscal digital por Internet.
                                                "
                            },
                            "xs:complexType": {
                              "xs:sequence": {
                                "xs:element": {
                                  "-name": "InformacionAduanera",
                                  "-minOccurs": "0",
                                  "-maxOccurs": "unbounded",
                                  "xs:annotation": {
                                    "xs:documentation": "
                                                                Nodo opcional para introducir la información aduanera aplicable cuando se trate de ventas de primera mano de mercancías importadas o se trate de operaciones de comercio exterior con bienes o servicios.
                                                            "
                                  },
                                  "xs:complexType": {
                                    "xs:attribute": {
                                      "-name": "NumeroPedimento",
                                      "-use": "required",
                                      "xs:annotation": {
                                        "xs:documentation": "
                                                                        Atributo requerido para expresar el número del pedimento que ampara la importación del bien que se expresa en el siguiente formato: últimos 2 dígitos del año de validación seguidos por dos espacios, 2 dígitos de la aduana de despacho seguidos por dos espacios, 4 dígitos del número de la patente seguidos por dos espacios, 1 dígito que corresponde al último dígito del año en curso, salvo que se trate de un pedimento consolidado iniciado en el año inmediato anterior o del pedimento original de una rectificación, seguido de 6 dígitos de la numeración progresiva por aduana.
                                                                    "
                                      },
                                      "xs:simpleType": {
                                        "xs:restriction": {
                                          "-base": "xs:string",
                                          "xs:length": { "-value": "21" },
                                          "xs:pattern": {
                                            "-value": "[0-9]{2} [0-9]{2} [0-9]{4} [0-9]{7}"
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              },
                              "xs:attribute": [
                                {
                                  "-name": "ClaveProdServ",
                                  "-use": "required",
                                  "-type": "catCFDI:c_ClaveProdServ",
                                  "xs:annotation": {
                                    "xs:documentation": "
                                                            Atributo requerido para expresar la clave del producto o del servicio amparado por la presente parte. Es requerido y deben utilizar las claves del catálogo de productos y servicios, cuando los conceptos que registren por sus actividades correspondan con dichos conceptos.
                                                        "
                                  }
                                },
                                {
                                  "-name": "NoIdentificacion",
                                  "-use": "optional",
                                  "xs:annotation": {
                                    "xs:documentation": "
                                                            Atributo opcional para expresar el número de serie, número de parte del bien o identificador del producto o del servicio amparado por la presente parte. Opcionalmente se puede utilizar claves del estándar GTIN.
                                                        "
                                  },
                                  "xs:simpleType": {
                                    "xs:restriction": {
                                      "-base": "xs:string",
                                      "xs:minLength": { "-value": "1" },
                                      "xs:maxLength": { "-value": "100" },
                                      "xs:whiteSpace": { "-value": "collapse" },
                                      "xs:pattern": {
                                        "-value": "[^|]{1, 100}"
                                      }
                                    }
                                  }
                                },
                                {
                                  "-name": "Cantidad",
                                  "-use": "required",
                                  "xs:annotation": {
                                    "xs:documentation": "
                                                            Atributo requerido para precisar la cantidad de bienes o servicios del tipo particular definido por la presente parte.
                                                        "
                                  },
                                  "xs:simpleType": {
                                    "xs:restriction": {
                                      "-base": "xs:decimal",
                                      "xs:fractionDigits": { "-value": "6" },
                                      "xs:minInclusive": { "-value": "0.000001" },
                                      "xs:whiteSpace": { "-value": "collapse" }
                                    }
                                  }
                                },
                                {
                                  "-name": "Unidad",
                                  "-use": "optional",
                                  "xs:annotation": {
                                    "xs:documentation": "
                                                            Atributo opcional para precisar la unidad de medida propia de la operación del emisor, aplicable para la cantidad expresada en la parte. La unidad debe corresponder con la descripción de la parte.
                                                        "
                                  },
                                  "xs:simpleType": {
                                    "xs:restriction": {
                                      "-base": "xs:string",
                                      "xs:minLength": { "-value": "1" },
                                      "xs:maxLength": { "-value": "20" },
                                      "xs:whiteSpace": { "-value": "collapse" },
                                      "xs:pattern": {
                                        "-value": "[^|]{1, 20}"
                                      }
                                    }
                                  }
                                },
                                {
                                  "-name": "Descripcion",
                                  "-use": "required",
                                  "xs:annotation": {
                                    "xs:documentation": "
                                                            Atributo requerido para precisar la descripción del bien o servicio cubierto por la presente parte.
                                                        "
                                  },
                                  "xs:simpleType": {
                                    "xs:restriction": {
                                      "-base": "xs:string",
                                      "xs:minLength": { "-value": "1" },
                                      "xs:maxLength": { "-value": "1000" },
                                      "xs:whiteSpace": { "-value": "collapse" },
                                      "xs:pattern": {
                                        "-value": "[^|]{1, 1000}"
                                      }
                                    }
                                  }
                                },
                                {
                                  "-name": "ValorUnitario",
                                  "-use": "optional",
                                  "-type": "tdCFDI:t_Importe",
                                  "xs:annotation": {
                                    "xs:documentation": "
                                                            Atributo opcional para precisar el valor o precio unitario del bien o servicio cubierto por la presente parte. No se permiten valores negativos.
                                                        "
                                  }
                                },
                                {
                                  "-name": "Importe",
                                  "-use": "optional",
                                  "-type": "tdCFDI:t_Importe",
                                  "xs:annotation": {
                                    "xs:documentation": "
                                                            Atributo opcional para precisar el importe total de los bienes o servicios de la presente parte. Debe ser equivalente al resultado de multiplicar la cantidad por el valor unitario expresado en la parte. No se permiten valores negativos.
                                                        "
                                  }
                                }
                              ]
                            }
                          }
                        ]
                      },
                      "xs:attribute": [
                        {
                          "-name": "ClaveProdServ",
                          "-use": "required",
                          "-type": "catCFDI:c_ClaveProdServ",
                          "xs:annotation": {
                            "xs:documentation": "
                                                Atributo requerido para expresar la clave del producto o del servicio amparado por el presente concepto. Es requerido y deben utilizar las claves del catálogo de productos y servicios, cuando los conceptos que registren por sus actividades correspondan con dichos conceptos.
                                            "
                          }
                        },
                        {
                          "-name": "NoIdentificacion",
                          "-use": "optional",
                          "xs:annotation": {
                            "xs:documentation": "
                                                Atributo opcional para expresar el número de parte, identificador del producto o del servicio, la clave de producto o servicio, SKU o equivalente, propia de la operación del emisor, amparado por el presente concepto. Opcionalmente se puede utilizar claves del estándar GTIN.
                                            "
                          },
                          "xs:simpleType": {
                            "xs:restriction": {
                              "-base": "xs:string",
                              "xs:whiteSpace": { "-value": "collapse" },
                              "xs:minLength": { "-value": "1" },
                              "xs:maxLength": { "-value": "100" },
                              "xs:pattern": {
                                "-value": "[^|]{1, 100}"
                              }
                            }
                          }
                        },
                        {
                          "-name": "Cantidad",
                          "-use": "required",
                          "xs:annotation": {
                            "xs:documentation": "
                                                Atributo requerido para precisar la cantidad de bienes o servicios del tipo particular definido por el presente concepto.
                                            "
                          },
                          "xs:simpleType": {
                            "xs:restriction": {
                              "-base": "xs:decimal",
                              "xs:fractionDigits": { "-value": "6" },
                              "xs:minInclusive": { "-value": "0.000001" },
                              "xs:whiteSpace": { "-value": "collapse" }
                            }
                          }
                        },
                        {
                          "-name": "ClaveUnidad",
                          "-use": "required",
                          "-type": "catCFDI:c_ClaveUnidad",
                          "xs:annotation": {
                            "xs:documentation": "
                                                Atributo requerido para precisar la clave de unidad de medida estandarizada aplicable para la cantidad expresada en el concepto. La unidad debe corresponder con la descripción del concepto.
                                            "
                          }
                        },
                        {
                          "-name": "Unidad",
                          "-use": "optional",
                          "xs:annotation": {
                            "xs:documentation": "
                                                Atributo opcional para precisar la unidad de medida propia de la operación del emisor, aplicable para la cantidad expresada en el concepto. La unidad debe corresponder con la descripción del concepto.
                                            "
                          },
                          "xs:simpleType": {
                            "xs:restriction": {
                              "-base": "xs:string",
                              "xs:minLength": { "-value": "1" },
                              "xs:maxLength": { "-value": "20" },
                              "xs:whiteSpace": { "-value": "collapse" },
                              "xs:pattern": {
                                "-value": "[^|]{1, 20}"
                              }
                            }
                          }
                        },
                        {
                          "-name": "Descripcion",
                          "-use": "required",
                          "xs:annotation": {
                            "xs:documentation": "
                                                Atributo requerido para precisar la descripción del bien o servicio cubierto por el presente concepto.
                                            "
                          },
                          "xs:simpleType": {
                            "xs:restriction": {
                              "-base": "xs:string",
                              "xs:minLength": { "-value": "1" },
                              "xs:maxLength": { "-value": "1000" },
                              "xs:whiteSpace": { "-value": "collapse" },
                              "xs:pattern": {
                                "-value": "[^|]{1, 1000}"
                              }
                            }
                          }
                        },
                        {
                          "-name": "ValorUnitario",
                          "-type": "tdCFDI:t_Importe",
                          "-use": "required",
                          "xs:annotation": {
                            "xs:documentation": "
                                                Atributo requerido para precisar el valor o precio unitario del bien o servicio cubierto por el presente concepto.
                                            "
                          }
                        },
                        {
                          "-name": "Importe",
                          "-type": "tdCFDI:t_Importe",
                          "-use": "required",
                          "xs:annotation": {
                            "xs:documentation": "
                                                Atributo requerido para precisar el importe total de los bienes o servicios del presente concepto. Debe ser equivalente al resultado de multiplicar la cantidad por el valor unitario expresado en el concepto. No se permiten valores negativos.
                                            "
                          }
                        },
                        {
                          "-name": "Descuento",
                          "-type": "tdCFDI:t_Importe",
                          "-use": "optional",
                          "xs:annotation": {
                            "xs:documentation": "
                                                Atributo opcional para representar el importe de los descuentos aplicables al concepto. No se permiten valores negativos.
                                            "
                          }
                        }
                      ]
                    }
                  }
                }
              }
            },
            {
              "-name": "Impuestos",
              "-minOccurs": "0",
              "xs:annotation": {
                "xs:documentation": "
                            Nodo condicional para expresar el resumen de los impuestos aplicables.
                        "
              },
              "xs:complexType": {
                "xs:sequence": {
                  "xs:element": [
                    {
                      "-name": "Retenciones",
                      "-minOccurs": "0",
                      "xs:annotation": {
                        "xs:documentation": "
                                        Nodo condicional para capturar los impuestos retenidos aplicables. Es requerido cuando en los conceptos se registre algún impuesto retenido.
                                    "
                      },
                      "xs:complexType": {
                        "xs:sequence": {
                          "xs:element": {
                            "-name": "Retencion",
                            "-maxOccurs": "unbounded",
                            "xs:annotation": {
                              "xs:documentation": "
                                                    Nodo requerido para la información detallada de una retención de impuesto específico.
                                                "
                            },
                            "xs:complexType": {
                              "xs:attribute": [
                                {
                                  "-name": "Impuesto",
                                  "-use": "required",
                                  "-type": "catCFDI:c_Impuesto",
                                  "xs:annotation": {
                                    "xs:documentation": "
                                                            Atributo requerido para señalar la clave del tipo de impuesto retenido
                                                        "
                                  }
                                },
                                {
                                  "-name": "Importe",
                                  "-type": "tdCFDI:t_Importe",
                                  "-use": "required",
                                  "xs:annotation": {
                                    "xs:documentation": "
                                                            Atributo requerido para señalar el monto del impuesto retenido. No se permiten valores negativos.
                                                        "
                                  }
                                }
                              ]
                            }
                          }
                        }
                      }
                    },
                    {
                      "-name": "Traslados",
                      "-minOccurs": "0",
                      "xs:annotation": {
                        "xs:documentation": "
                                        Nodo condicional para capturar los impuestos trasladados aplicables. Es requerido cuando en los conceptos se registre un impuesto trasladado.
                                    "
                      },
                      "xs:complexType": {
                        "xs:sequence": {
                          "xs:element": {
                            "-name": "Traslado",
                            "-maxOccurs": "unbounded",
                            "xs:annotation": {
                              "xs:documentation": "
                                                    Nodo requerido para la información detallada de un traslado de impuesto específico.
                                                "
                            },
                            "xs:complexType": {
                              "xs:attribute": [
                                {
                                  "-name": "Impuesto",
                                  "-use": "required",
                                  "-type": "catCFDI:c_Impuesto",
                                  "xs:annotation": {
                                    "xs:documentation": "
                                                            Atributo requerido para señalar la clave del tipo de impuesto trasladado.
                                                        "
                                  }
                                },
                                {
                                  "-name": "TipoFactor",
                                  "-type": "catCFDI:c_TipoFactor",
                                  "-use": "required",
                                  "xs:annotation": {
                                    "xs:documentation": "
                                                            Atributo requerido para señalar la clave del tipo de factor que se aplica a la base del impuesto.
                                                        "
                                  }
                                },
                                {
                                  "-name": "TasaOCuota",
                                  "-use": "required",
                                  "xs:annotation": {
                                    "xs:documentation": "
                                                            Atributo requerido para señalar el valor de la tasa o cuota del impuesto que se traslada por los conceptos amparados en el comprobante.
                                                        "
                                  },
                                  "xs:simpleType": {
                                    "xs:restriction": {
                                      "-base": "xs:decimal",
                                      "xs:whiteSpace": { "-value": "collapse" },
                                      "xs:minInclusive": { "-value": "0.000000" },
                                      "xs:fractionDigits": { "-value": "6" }
                                    }
                                  }
                                },
                                {
                                  "-name": "Importe",
                                  "-type": "tdCFDI:t_Importe",
                                  "-use": "required",
                                  "xs:annotation": {
                                    "xs:documentation": "
                                                            Atributo requerido para señalar la suma del importe del impuesto trasladado, agrupado por impuesto, TipoFactor y TasaOCuota. No se permiten valores negativos.
                                                        "
                                  }
                                }
                              ]
                            }
                          }
                        }
                      }
                    }
                  ]
                },
                "xs:attribute": [
                  {
                    "-name": "TotalImpuestosRetenidos",
                    "-type": "tdCFDI:t_Importe",
                    "-use": "optional",
                    "xs:annotation": {
                      "xs:documentation": "
                                    Atributo condicional para expresar el total de los impuestos retenidos que se desprenden de los conceptos expresados en el comprobante fiscal digital por Internet. No se permiten valores negativos. Es requerido cuando en los conceptos se registren impuestos retenidos
                                "
                    }
                  },
                  {
                    "-name": "TotalImpuestosTrasladados",
                    "-type": "tdCFDI:t_Importe",
                    "-use": "optional",
                    "xs:annotation": {
                      "xs:documentation": "
                                    Atributo condicional para expresar el total de los impuestos trasladados que se desprenden de los conceptos expresados en el comprobante fiscal digital por Internet. No se permiten valores negativos. Es requerido cuando en los conceptos se registren impuestos trasladados.
                                "
                    }
                  }
                ]
              }
            },
            {
              "-name": "Complemento",
              "-minOccurs": "0",
              "-maxOccurs": "unbounded",
              "xs:annotation": {
                "xs:documentation": "
                            Nodo opcional donde se incluye el complemento Timbre Fiscal Digital de manera obligatoria y los nodos complementarios determinados por el SAT, de acuerdo con las disposiciones particulares para un sector o actividad específica.
                        "
              },
              "xs:complexType": {
                "xs:sequence": {
                  "xs:any": {
                    "-minOccurs": "0",
                    "-maxOccurs": "unbounded"
                  }
                }
              }
            },
            {
              "-name": "Addenda",
              "-minOccurs": "0",
              "xs:annotation": {
                "xs:documentation": "
                            Nodo opcional para recibir las extensiones al presente formato que sean de utilidad al contribuyente. Para las reglas de uso del mismo, referirse al formato origen.
                        "
              },
              "xs:complexType": {
                "xs:sequence": {
                  "xs:any": { "-maxOccurs": "unbounded" }
                }
              }
            }
          ]
        },
        "xs:attribute": [
          {
            "-name": "Version",
            "-use": "required",
            "-fixed": "3.3",
            "xs:annotation": {
              "xs:documentation": "
                        Atributo requerido con valor prefijado a 3.3 que indica la versión del estándar bajo el que se encuentra expresado el comprobante.
                    "
            },
            "xs:simpleType": {
              "xs:restriction": {
                "-base": "xs:string",
                "xs:whiteSpace": { "-value": "collapse" }
              }
            }
          },
          {
            "-name": "Serie",
            "-use": "optional",
            "xs:annotation": {
              "xs:documentation": "
                        Atributo opcional para precisar la serie para control interno del contribuyente. Este atributo acepta una cadena de caracteres.
                    "
            },
            "xs:simpleType": {
              "xs:restriction": {
                "-base": "xs:string",
                "xs:minLength": { "-value": "1" },
                "xs:maxLength": { "-value": "25" },
                "xs:whiteSpace": { "-value": "collapse" },
                "xs:pattern": {
                  "-value": "[^|]{1, 25}"
                }
              }
            }
          },
          {
            "-name": "Folio",
            "-use": "optional",
            "xs:annotation": {
              "xs:documentation": "
                        Atributo opcional para control interno del contribuyente que expresa el folio del comprobante, acepta una cadena de caracteres.
                    "
            },
            "xs:simpleType": {
              "xs:restriction": {
                "-base": "xs:string",
                "xs:minLength": { "-value": "1" },
                "xs:maxLength": { "-value": "40" },
                "xs:whiteSpace": { "-value": "collapse" },
                "xs:pattern": {
                  "-value": "[^|]{1, 40}"
                }
              }
            }
          },
          {
            "-name": "Fecha",
            "-use": "required",
            "-type": "tdCFDI:t_FechaH",
            "xs:annotation": {
              "xs:documentation": "
                        Atributo requerido para la expresión de la fecha y hora de expedición del Comprobante Fiscal Digital por Internet. Se expresa en la forma AAAA-MM-DDThh:mm:ss y debe corresponder con la hora local donde se expide el comprobante.
                    "
            }
          },
          {
            "-name": "Sello",
            "-use": "required",
            "xs:annotation": {
              "xs:documentation": "
                        Atributo requerido para contener el sello digital del comprobante fiscal, al que hacen referencia las reglas de resolución miscelánea vigente. El sello debe ser expresado como una cadena de texto en formato Base 64.
                    "
            },
            "xs:simpleType": {
              "xs:restriction": {
                "-base": "xs:string",
                "xs:whiteSpace": { "-value": "collapse" }
              }
            }
          },
          {
            "-name": "FormaPago",
            "-use": "optional",
            "-type": "catCFDI:c_FormaPago",
            "xs:annotation": {
              "xs:documentation": "
                        Atributo condicional para expresar la clave de la forma de pago de los bienes o servicios amparados por el comprobante. Si no se conoce la forma de pago este atributo se debe omitir.
                    "
            }
          },
          {
            "-name": "NoCertificado",
            "-use": "required",
            "xs:annotation": {
              "xs:documentation": "
                        Atributo requerido para expresar el número de serie del certificado de sello digital que ampara al comprobante, de acuerdo con el acuse correspondiente a 20 posiciones otorgado por el sistema del SAT.
                    "
            },
            "xs:simpleType": {
              "xs:restriction": {
                "-base": "xs:string",
                "xs:length": { "-value": "20" },
                "xs:whiteSpace": { "-value": "collapse" },
                "xs:pattern": {
                  "-value": "[0-9]{20}"
                }
              }
            }
          },
          {
            "-name": "Certificado",
            "-use": "required",
            "xs:annotation": {
              "xs:documentation": "
                        Atributo requerido que sirve para incorporar el certificado de sello digital que ampara al comprobante, como texto en formato base 64.
                    "
            },
            "xs:simpleType": {
              "xs:restriction": {
                "-base": "xs:string",
                "xs:whiteSpace": { "-value": "collapse" }
              }
            }
          },
          {
            "-name": "CondicionesDePago",
            "-use": "optional",
            "xs:annotation": {
              "xs:documentation": "
                        Atributo condicional para expresar las condiciones comerciales aplicables para el pago del comprobante fiscal digital por Internet. Este atributo puede ser condicionado mediante atributos o complementos.
                    "
            },
            "xs:simpleType": {
              "xs:restriction": {
                "-base": "xs:string",
                "xs:whiteSpace": { "-value": "collapse" },
                "xs:minLength": { "-value": "1" },
                "xs:maxLength": { "-value": "1000" },
                "xs:pattern": {
                  "-value": "[^|]{1, 1000}"
                }
              }
            }
          },
          {
            "-name": "SubTotal",
            "-type": "tdCFDI:t_Importe",
            "-use": "required",
            "xs:annotation": {
              "xs:documentation": "
                        Atributo requerido para representar la suma de los importes de los conceptos antes de descuentos e impuesto. No se permiten valores negativos.
                    "
            }
          },
          {
            "-name": "Descuento",
            "-type": "tdCFDI:t_Importe",
            "-use": "optional",
            "xs:annotation": {
              "xs:documentation": "
                        Atributo condicional para representar el importe total de los descuentos aplicables antes de impuestos. No se permiten valores negativos. Se debe registrar cuando existan conceptos con descuento.
                    "
            }
          },
          {
            "-name": "Moneda",
            "-type": "catCFDI:c_Moneda",
            "-use": "required",
            "xs:annotation": {
              "xs:documentation": "
                        Atributo requerido para identificar la clave de la moneda utilizada para expresar los montos, cuando se usa moneda nacional se registra MXN. Conforme con la especificación ISO 4217.
                    "
            }
          },
          {
            "-name": "TipoCambio",
            "-use": "optional",
            "xs:annotation": {
              "xs:documentation": "
                        Atributo condicional para representar el tipo de cambio conforme con la moneda usada. Es requerido cuando la clave de moneda es distinta de MXN y de XXX. El valor debe reflejar el número de pesos mexicanos que equivalen a una unidad de la divisa señalada en el atributo moneda. Si el valor está fuera del porcentaje aplicable a la moneda tomado del catálogo c_Moneda, el emisor debe obtener del PAC que vaya a timbrar el CFDI, de manera no automática, una clave de confirmación para ratificar que el valor es correcto e integrar dicha clave en el atributo Confirmacion.
                    "
            },
            "xs:simpleType": {
              "xs:restriction": {
                "-base": "xs:decimal",
                "xs:fractionDigits": { "-value": "6" },
                "xs:minInclusive": { "-value": "0.000001" },
                "xs:whiteSpace": { "-value": "collapse" }
              }
            }
          },
          {
            "-name": "Total",
            "-type": "tdCFDI:t_Importe",
            "-use": "required",
            "xs:annotation": {
              "xs:documentation": "
                        Atributo requerido para representar la suma del subtotal, menos los descuentos aplicables, más las contribuciones recibidas (impuestos trasladados - federales o locales, derechos, productos, aprovechamientos, aportaciones de seguridad social, contribuciones de mejoras) menos los impuestos retenidos. Si el valor es superior al límite que establezca el SAT en la Resolución Miscelánea Fiscal vigente, el emisor debe obtener del PAC que vaya a timbrar el CFDI, de manera no automática, una clave de confirmación para ratificar que el valor es correcto e integrar dicha clave en el atributo Confirmacion. No se permiten valores negativos.
                    "
            }
          },
          {
            "-name": "TipoDeComprobante",
            "-use": "required",
            "-type": "catCFDI:c_TipoDeComprobante",
            "xs:annotation": {
              "xs:documentation": "
                        Atributo requerido para expresar la clave del efecto del comprobante fiscal para el contribuyente emisor.
                    "
            }
          },
          {
            "-name": "MetodoPago",
            "-use": "optional",
            "-type": "catCFDI:c_MetodoPago",
            "xs:annotation": {
              "xs:documentation": "
                        Atributo condicional para precisar la clave del método de pago que aplica para este comprobante fiscal digital por Internet, conforme al Artículo 29-A fracción VII incisos a y b del CFF.
                    "
            }
          },
          {
            "-name": "LugarExpedicion",
            "-use": "required",
            "-type": "catCFDI:c_CodigoPostal",
            "xs:annotation": {
              "xs:documentation": "
                        Atributo requerido para incorporar el código postal del lugar de expedición del comprobante (domicilio de la matriz o de la sucursal).
                    "
            }
          },
          {
            "-name": "Confirmacion",
            "-use": "optional",
            "xs:annotation": {
              "xs:documentation": "
                        Atributo condicional para registrar la clave de confirmación que entregue el PAC para expedir el comprobante con importes grandes, con un tipo de cambio fuera del rango establecido o con ambos casos. Es requerido cuando se registra un tipo de cambio o un total fuera del rango establecido.
                    "
            },
            "xs:simpleType": {
              "xs:restriction": {
                "-base": "xs:string",
                "xs:whiteSpace": { "-value": "collapse" },
                "xs:length": { "-value": "5" },
                "xs:pattern": {
                  "-value": "[0-9a-zA-Z]{5}"
                }
              }
            }
          }
        ]
      }
    }
  }
}