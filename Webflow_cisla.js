! function(a) {
    "object" == typeof module && module.exports ? module.exports = a() : window.intlTelInput = a()
}(function(a) {
    "use strict";
    return function() {
        function b(a, b) {
            if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
        }

        function c(a, b) {
            for (var c = 0; c < b.length; c++) {
                var d = b[c];
                d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
            }
        }

        function d(a, b, d) {
            return b && c(a.prototype, b), d && c(a, d), a
        }
        for (var e = [
                ["Česká republika", "cz", "420"],
                ["Slovensko", "sk", "421"]
            ], f = 0; f < e.length; f++) {
            var g = e[f];
            e[f] = {
                name: g[0],
                iso2: g[1],
                dialCode: g[2],
                priority: g[3] || 0,
                areaCodes: g[4] || null
            }
        }
        var h = {
            getInstance: function(a) {
                var b = a.getAttribute("data-intl-tel-input-id");
                return window.intlTelInputGlobals.instances[b]
            },
            instances: {},
            documentReady: function() {
                return "complete" === document.readyState
            }
        };
        "object" == typeof window && (window.intlTelInputGlobals = h);
        var i = 0,
            j = {
                allowDropdown: !0,
                autoHideDialCode: !0,
                autoPlaceholder: "polite",
                customContainer: "",
                customPlaceholder: null,
                dropdownContainer: null,
                excludeCountries: [],
                formatOnDisplay: !0,
                geoIpLookup: null,
                hiddenInput: "",
                initialCountry: "",
                localizedCountries: null,
                nationalMode: !0,
                onlyCountries: [],
                placeholderNumberType: "MOBILE",
                preferredCountries: [],
                separateDialCode: !1,
                utilsScript: ""
            },
            k = ["800", "822", "833", "844", "855", "866", "877", "880", "881", "882", "883", "884", "885", "886", "887", "888", "889"],
            l = function(a, b) {
                for (var c = Object.keys(a), d = 0; d < c.length; d++) b(c[d], a[c[d]])
            },
            m = function(a) {
                l(window.intlTelInputGlobals.instances, function(b) {
                    window.intlTelInputGlobals.instances[b][a]()
                })
            },
            n = function() {
                function c(a, d) {
                    var e = this;
                    b(this, c), this.id = i++, this.a = a, this.b = null, this.c = null;
                    var f = d || {};
                    this.d = {}, l(j, function(a, b) {
                        e.d[a] = f.hasOwnProperty(a) ? f[a] : b
                    }), this.e = Boolean(a.getAttribute("placeholder"))
                }
                return d(c, [{
                    key: "_init",
                    value: function() {
                        var a = this;
                        if (this.d.nationalMode && (this.d.autoHideDialCode = !1), this.d.separateDialCode && (this.d.autoHideDialCode = this.d.nationalMode = !1), this.g = /Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), this.g && (document.body.classList.add("iti-mobile"), this.d.dropdownContainer || (this.d.dropdownContainer = document.body)), "undefined" != typeof Promise) {
                            var b = new Promise(function(b, c) {
                                    a.h = b, a.i = c
                                }),
                                c = new Promise(function(b, c) {
                                    a.i0 = b, a.i1 = c
                                });
                            this.promise = Promise.all([b, c])
                        } else this.h = this.i = function() {}, this.i0 = this.i1 = function() {};
                        this.s = {}, this._b(), this._f(), this._h(), this._i(), this._i3()
                    }
                }, {
                    key: "_b",
                    value: function() {
                        this._d(), this._d2(), this._e(), this.d.localizedCountries && this._d0(), (this.d.onlyCountries.length || this.d.localizedCountries) && this.p.sort(this._d1)
                    }
                }, {
                    key: "_c",
                    value: function(b, c, d) {
                        c.length > this.countryCodeMaxLen && (this.countryCodeMaxLen = c.length), this.q.hasOwnProperty(c) || (this.q[c] = []);
                        for (var e = 0; e < this.q[c].length; e++)
                            if (this.q[c][e] === b) return;
                        var f = d !== a ? d : this.q[c].length;
                        this.q[c][f] = b
                    }
                }, {
                    key: "_d",
                    value: function() {
                        if (this.d.onlyCountries.length) {
                            var a = this.d.onlyCountries.map(function(a) {
                                return a.toLowerCase()
                            });
                            this.p = e.filter(function(b) {
                                return a.indexOf(b.iso2) > -1
                            })
                        } else if (this.d.excludeCountries.length) {
                            var b = this.d.excludeCountries.map(function(a) {
                                return a.toLowerCase()
                            });
                            this.p = e.filter(function(a) {
                                return -1 === b.indexOf(a.iso2)
                            })
                        } else this.p = e
                    }
                }, {
                    key: "_d0",
                    value: function() {
                        for (var a = 0; a < this.p.length; a++) {
                            var b = this.p[a].iso2.toLowerCase();
                            this.d.localizedCountries.hasOwnProperty(b) && (this.p[a].name = this.d.localizedCountries[b])
                        }
                    }
                }, {
                    key: "_d1",
                    value: function(a, b) {
                        return a.name.localeCompare(b.name)
                    }
                }, {
                    key: "_d2",
                    value: function() {
                        this.countryCodeMaxLen = 0, this.dialCodes = {}, this.q = {};
                        for (var a = 0; a < this.p.length; a++) {
                            var b = this.p[a];
                            this.dialCodes[b.dialCode] || (this.dialCodes[b.dialCode] = !0), this._c(b.iso2, b.dialCode, b.priority)
                        }
                        for (var c = 0; c < this.p.length; c++) {
                            var d = this.p[c];
                            if (d.areaCodes)
                                for (var e = this.q[d.dialCode][0], f = 0; f < d.areaCodes.length; f++) {
                                    for (var g = d.areaCodes[f], h = 1; h < g.length; h++) {
                                        var i = d.dialCode + g.substr(0, h);
                                        this._c(e, i), this._c(d.iso2, i)
                                    }
                                    this._c(d.iso2, d.dialCode + g)
                                }
                        }
                    }
                }, {
                    key: "_e",
                    value: function() {
                        this.preferredCountries = [];
                        for (var a = 0; a < this.d.preferredCountries.length; a++) {
                            var b = this.d.preferredCountries[a].toLowerCase(),
                                c = this._y(b, !1, !0);
                            c && this.preferredCountries.push(c)
                        }
                    }
                }, {
                    key: "_e2",
                    value: function(a, b, c) {
                        var d = document.createElement(a);
                        return b && l(b, function(a, b) {
                            return d.setAttribute(a, b)
                        }), c && c.appendChild(d), d
                    }
                }, {
                    key: "_f",
                    value: function() {
                        this.a.hasAttribute("autocomplete") || this.a.form && this.a.form.hasAttribute("autocomplete") || this.a.setAttribute("autocomplete", "off");
                        var a = "iti";
                        this.d.allowDropdown && (a += " iti--allow-dropdown"), this.d.separateDialCode && (a += " iti--separate-dial-code"), this.d.customContainer && (a += " ", a += this.d.customContainer);
                        var b = this._e2("div", {
                            "class": a
                        });
                        if (this.a.parentNode.insertBefore(b, this.a), this.k = this._e2("div", {
                                "class": "iti__flag-container"
                            }, b), b.appendChild(this.a), this.selectedFlag = this._e2("div", {
                                "class": "iti__selected-flag",
                                role: "combobox",
                                "aria-controls": "iti-".concat(this.id, "__country-listbox"),
                                "aria-owns": "iti-".concat(this.id, "__country-listbox"),
                                "aria-expanded": "false"
                            }, this.k), this.l = this._e2("div", {
                                "class": "iti__flag"
                            }, this.selectedFlag), this.d.separateDialCode && (this.t = this._e2("div", {
                                "class": "iti__selected-dial-code"
                            }, this.selectedFlag)), this.d.allowDropdown && (this.selectedFlag.setAttribute("tabindex", "0"), this.u = this._e2("div", {
                                "class": "iti__arrow"
                            }, this.selectedFlag), this.m = this._e2("ul", {
                                "class": "iti__country-list iti__hide",
                                id: "iti-".concat(this.id, "__country-listbox"),
                                role: "listbox",
                                "aria-label": "List of countries"
                            }), this.preferredCountries.length && (this._g(this.preferredCountries, "iti__preferred", !0), this._e2("li", {
                                "class": "iti__divider",
                                role: "separator",
                                "aria-disabled": "true"
                            }, this.m)), this._g(this.p, "iti__standard"), this.d.dropdownContainer ? (this.dropdown = this._e2("div", {
                                "class": "iti iti--container"
                            }), this.dropdown.appendChild(this.m)) : this.k.appendChild(this.m)), this.d.hiddenInput) {
                            var c = this.d.hiddenInput,
                                d = this.a.getAttribute("name");
                            if (d) {
                                var e = d.lastIndexOf("["); - 1 !== e && (c = "".concat(d.substr(0, e), "[").concat(c, "]"))
                            }
                            this.hiddenInput = this._e2("input", {
                                type: "hidden",
                                name: c
                            }), b.appendChild(this.hiddenInput)
                        }
                    }
                }, {
                    key: "_g",
                    value: function(a, b, c) {
                        for (var d = "", e = 0; e < a.length; e++) {
                            var f = a[e],
                                g = c ? "-preferred" : "";
                            d += "<li class='iti__country ".concat(b, "' tabIndex='-1' id='iti-").concat(this.id, "__item-").concat(f.iso2).concat(g, "' role='option' data-dial-code='").concat(f.dialCode, "' data-country-code='").concat(f.iso2, "' aria-selected='false'>"), d += "<div class='iti__flag-box'><div class='iti__flag iti__".concat(f.iso2, "'></div></div>"), d += "<span class='iti__country-name'>".concat(f.name, "</span>"), d += "<span class='iti__dial-code'>+".concat(f.dialCode, "</span>"), d += "</li>"
                        }
                        this.m.insertAdjacentHTML("beforeend", d)
                    }
                }, {
                    key: "_h",
                    value: function() {
                        var a = this.a.getAttribute("value"),
                            b = this.a.value,
                            c = a && "+" === a.charAt(0) && (!b || "+" !== b.charAt(0)),
                            d = c ? a : b,
                            e = this._5(d),
                            f = this._w(d),
                            g = this.d,
                            h = g.initialCountry,
                            i = g.nationalMode,
                            j = g.autoHideDialCode,
                            k = g.separateDialCode;
                        e && !f ? this._v(d) : "auto" !== h && (h ? this._z(h.toLowerCase()) : e && f ? this._z("sk") : (this.j = this.preferredCountries.length ? this.preferredCountries[0].iso2 : this.p[0].iso2, d || this._z(this.j)), d || i || j || k || (this.a.value = "+".concat(this.s.dialCode))), d && this._u(d)
                    }
                }, {
                    key: "_i",
                    value: function() {
                        this._j(), this.d.autoHideDialCode && this._l(), this.d.allowDropdown && this._i2(), this.hiddenInput && this._i0()
                    }
                }, {
                    key: "_i0",
                    value: function() {
                        var a = this;
                        this._a14 = function() {
                            a.hiddenInput.value = a.getNumber()
                        }, this.a.form && this.a.form.addEventListener("submit", this._a14)
                    }
                }, {
                    key: "_i1",
                    value: function() {
                        for (var a = this.a; a && "LABEL" !== a.tagName;) a = a.parentNode;
                        return a
                    }
                }, {
                    key: "_i2",
                    value: function() {
                        var a = this;
                        this._a9 = function(b) {
                            a.m.classList.contains("iti__hide") ? a.a.focus() : b.preventDefault()
                        };
                        var b = this._i1();
                        b && b.addEventListener("click", this._a9), this._a10 = function() {
                            !a.m.classList.contains("iti__hide") || a.a.disabled || a.a.readOnly || a._n()
                        }, this.selectedFlag.addEventListener("click", this._a10), this._a11 = function(b) {
                            a.m.classList.contains("iti__hide") && -1 !== ["ArrowUp", "Up", "ArrowDown", "Down", " ", "Enter"].indexOf(b.key) && (b.preventDefault(), b.stopPropagation(), a._n()), "Tab" === b.key && a._2()
                        }, this.k.addEventListener("keydown", this._a11)
                    }
                }, {
                    key: "_i3",
                    value: function() {
                        var a = this;
                        this.d.utilsScript && !window.intlTelInputUtils ? window.intlTelInputGlobals.documentReady() ? window.intlTelInputGlobals.loadUtils(this.d.utilsScript) : window.addEventListener("load", function() {
                            window.intlTelInputGlobals.loadUtils(a.d.utilsScript)
                        }) : this.i0(), "auto" === this.d.initialCountry ? this._i4() : this.h()
                    }
                }, {
                    key: "_i4",
                    value: function() {
                        window.intlTelInputGlobals.autoCountry ? this.handleAutoCountry() : window.intlTelInputGlobals.startedLoadingAutoCountry || (window.intlTelInputGlobals.startedLoadingAutoCountry = !0, "function" == typeof this.d.geoIpLookup && this.d.geoIpLookup(function(a) {
                            window.intlTelInputGlobals.autoCountry = a.toLowerCase(), setTimeout(function() {
                                return m("handleAutoCountry")
                            })
                        }, function() {
                            return m("rejectAutoCountryPromise")
                        }))
                    }
                }, {
                    key: "_j",
                    value: function() {
                        var a = this;
                        this._a12 = function() {
                            a._v(a.a.value) && a._m2CountryChange()
                        }, this.a.addEventListener("keyup", this._a12), this._a13 = function() {
                            setTimeout(a._a12)
                        }, this.a.addEventListener("cut", this._a13), this.a.addEventListener("paste", this._a13)
                    }
                }, {
                    key: "_j2",
                    value: function(a) {
                        var b = this.a.getAttribute("maxlength");
                        return b && a.length > b ? a.substr(0, b) : a
                    }
                }, {
                    key: "_l",
                    value: function() {
                        var a = this;
                        this._a8 = function() {
                            a._l2()
                        }, this.a.form && this.a.form.addEventListener("submit", this._a8), this.a.addEventListener("blur", this._a8)
                    }
                }, {
                    key: "_l2",
                    value: function() {
                        if ("+" === this.a.value.charAt(0)) {
                            var a = this._m(this.a.value);
                            a && this.s.dialCode !== a || (this.a.value = "")
                        }
                    }
                }, {
                    key: "_m",
                    value: function(a) {
                        return a.replace(/\D/g, "")
                    }
                }, {
                    key: "_m2",
                    value: function(a) {
                        var b = document.createEvent("Event");
                        b.initEvent(a, !0, !0), this.a.dispatchEvent(b)
                    }
                }, {
                    key: "_n",
                    value: function() {
                        this.m.classList.remove("iti__hide"), this.selectedFlag.setAttribute("aria-expanded", "true"), this._o(), this.b && (this._x(this.b, !1), this._3(this.b, !0)), this._p(), this.u.classList.add("iti__arrow--up"), this._m2("open:countrydropdown")
                    }
                }, {
                    key: "_n2",
                    value: function(a, b, c) {
                        c && !a.classList.contains(b) ? a.classList.add(b) : !c && a.classList.contains(b) && a.classList.remove(b)
                    }
                }, {
                    key: "_o",
                    value: function() {
                        var a = this;
                        if (this.d.dropdownContainer && this.d.dropdownContainer.appendChild(this.dropdown), !this.g) {
                            var b = this.a.getBoundingClientRect(),
                                c = window.pageYOffset || document.documentElement.scrollTop,
                                d = b.top + c,
                                e = this.m.offsetHeight,
                                f = d + this.a.offsetHeight + e < c + window.innerHeight,
                                g = d - e > c;
                            if (this._n2(this.m, "iti__country-list--dropup", !f && g), this.d.dropdownContainer) {
                                var h = !f && g ? 0 : this.a.offsetHeight;
                                this.dropdown.style.top = "".concat(d + h, "px"), this.dropdown.style.left = "".concat(b.left + document.body.scrollLeft, "px"), this._a4 = function() {
                                    return a._2()
                                }, window.addEventListener("scroll", this._a4)
                            }
                        }
                    }
                }, {
                    key: "_o2",
                    value: function(a) {
                        for (var b = a; b && b !== this.m && !b.classList.contains("iti__country");) b = b.parentNode;
                        return b === this.m ? null : b
                    }
                }, {
                    key: "_p",
                    value: function() {
                        var a = this;
                        this._a0 = function(b) {
                            var c = a._o2(b.target);
                            c && a._x(c, !1)
                        }, this.m.addEventListener("mouseover", this._a0), this._a1 = function(b) {
                            var c = a._o2(b.target);
                            c && a._1(c)
                        }, this.m.addEventListener("click", this._a1);
                        var b = !0;
                        this._a2 = function() {
                            b || a._2(), b = !1
                        }, document.documentElement.addEventListener("click", this._a2);
                        var c = "",
                            d = null;
                        this._a3 = function(b) {
                            b.preventDefault(), "ArrowUp" === b.key || "Up" === b.key || "ArrowDown" === b.key || "Down" === b.key ? a._q(b.key) : "Enter" === b.key ? a._r() : "Escape" === b.key ? a._2() : /^[a-zA-ZÀ-ÿа-яА-Я ]$/.test(b.key) && (d && clearTimeout(d), c += b.key.toLowerCase(), a._s(c), d = setTimeout(function() {
                                c = ""
                            }, 1e3))
                        }, document.addEventListener("keydown", this._a3)
                    }
                }, {
                    key: "_q",
                    value: function(a) {
                        var b = "ArrowUp" === a || "Up" === a ? this.c.previousElementSibling : this.c.nextElementSibling;
                        b && (b.classList.contains("iti__divider") && (b = "ArrowUp" === a || "Up" === a ? b.previousElementSibling : b.nextElementSibling), this._x(b, !0))
                    }
                }, {
                    key: "_r",
                    value: function() {
                        this.c && this._1(this.c)
                    }
                }, {
                    key: "_s",
                    value: function(a) {
                        for (var b = 0; b < this.p.length; b++)
                            if (this._t(this.p[b].name, a)) {
                                var c = this.m.querySelector("#iti-".concat(this.id, "__item-").concat(this.p[b].iso2));
                                this._x(c, !1), this._3(c, !0);
                                break
                            }
                    }
                }, {
                    key: "_t",
                    value: function(a, b) {
                        return a.substr(0, b.length).toLowerCase() === b
                    }
                }, {
                    key: "_u",
                    value: function(a) {
                        var b = a;
                        if (this.d.formatOnDisplay && window.intlTelInputUtils && this.s) {
                            var c = !this.d.separateDialCode && (this.d.nationalMode || "+" !== b.charAt(0)),
                                d = intlTelInputUtils.numberFormat,
                                e = d.NATIONAL,
                                f = d.INTERNATIONAL,
                                g = c ? e : f;
                            b = intlTelInputUtils.formatNumber(b, this.s.iso2, g)
                        }
                        b = this._7(b), this.a.value = b
                    }
                }, {
                    key: "_v",
                    value: function(a) {
                        var b = a,
                            c = this.s.dialCode,
                            d = "1" === c;
                        b && this.d.nationalMode && d && "+" !== b.charAt(0) && ("1" !== b.charAt(0) && (b = "1".concat(b)), b = "+".concat(b)), this.d.separateDialCode && c && "+" !== b.charAt(0) && (b = "+".concat(c).concat(b));
                        var e = this._5(b, !0),
                            f = this._m(b),
                            g = null;
                        if (e) {
                            var h = this.q[this._m(e)],
                                i = -1 !== h.indexOf(this.s.iso2) && f.length <= e.length - 1;
                            if (!("1" === c && this._w(f)) && !i)
                                for (var j = 0; j < h.length; j++)
                                    if (h[j]) {
                                        g = h[j];
                                        break
                                    }
                        } else "+" === b.charAt(0) && f.length ? g = "" : b && "+" !== b || (g = this.j);
                        return null !== g && this._z(g)
                    }
                }, {
                    key: "_w",
                    value: function(a) {
                        var b = this._m(a);
                        if ("1" === b.charAt(0)) {
                            var c = b.substr(1, 3);
                            return -1 !== k.indexOf(c)
                        }
                        return !1
                    }
                }, {
                    key: "_x",
                    value: function(a, b) {
                        var c = this.c;
                        c && c.classList.remove("iti__highlight"), this.c = a, this.c.classList.add("iti__highlight"), b && this.c.focus()
                    }
                }, {
                    key: "_y",
                    value: function(a, b, c) {
                        for (var d = b ? e : this.p, f = 0; f < d.length; f++)
                            if (d[f].iso2 === a) return d[f];
                        if (c) return null;
                        throw new Error("No country data for '".concat(a, "'"))
                    }
                }, {
                    key: "_z",
                    value: function(a) {
                        var b = this.s.iso2 ? this.s : {};
                        this.s = a ? this._y(a, !1, !1) : {}, this.s.iso2 && (this.j = this.s.iso2), this.l.setAttribute("class", "iti__flag iti__".concat(a));
                        var c = a ? "".concat(this.s.name, ": +").concat(this.s.dialCode) : "Unknown";
                        if (this.selectedFlag.setAttribute("title", c), this.d.separateDialCode) {
                            var d = this.s.dialCode ? "+".concat(this.s.dialCode) : "";
                            this.t.innerHTML = d;
                            var e = this.selectedFlag.offsetWidth || this._z2();
                            this.a.style.paddingLeft = "".concat(e + 6, "px")
                        }
                        if (this._0(), this.d.allowDropdown) {
                            var f = this.b;
                            if (f && (f.classList.remove("iti__active"), f.setAttribute("aria-selected", "false")), a) {
                                var g = this.m.querySelector("#iti-".concat(this.id, "__item-").concat(a, "-preferred")) || this.m.querySelector("#iti-".concat(this.id, "__item-").concat(a));
                                g.setAttribute("aria-selected", "true"), g.classList.add("iti__active"), this.b = g, this.selectedFlag.setAttribute("aria-activedescendant", g.getAttribute("id"))
                            }
                        }
                        return b.iso2 !== a
                    }
                }, {
                    key: "_z2",
                    value: function() {
                        var a = this.a.parentNode.cloneNode();
                        a.style.visibility = "hidden", document.body.appendChild(a);
                        var b = this.k.cloneNode();
                        a.appendChild(b);
                        var c = this.selectedFlag.cloneNode(!0);
                        b.appendChild(c);
                        var d = c.offsetWidth;
                        return a.parentNode.removeChild(a), d
                    }
                }, {
                    key: "_0",
                    value: function() {
                        var a = "aggressive" === this.d.autoPlaceholder || !this.e && "polite" === this.d.autoPlaceholder;
                        if (window.intlTelInputUtils && a) {
                            var b = intlTelInputUtils.numberType[this.d.placeholderNumberType],
                                c = this.s.iso2 ? intlTelInputUtils.getExampleNumber(this.s.iso2, this.d.nationalMode, b) : "";
                            c = this._7(c), "function" == typeof this.d.customPlaceholder && (c = this.d.customPlaceholder(c, this.s)), this.a.setAttribute("placeholder", c)
                        }
                    }
                }, {
                    key: "_1",
                    value: function(a) {
                        var b = this._z(a.getAttribute("data-country-code"));
                        this._2(), this._4(a.getAttribute("data-dial-code"), !0), this.a.focus();
                        var c = this.a.value.length;
                        this.a.setSelectionRange(c, c), b && this._m2CountryChange()
                    }
                }, {
                    key: "_2",
                    value: function() {
                        this.m.classList.add("iti__hide"), this.selectedFlag.setAttribute("aria-expanded", "false"), this.u.classList.remove("iti__arrow--up"), document.removeEventListener("keydown", this._a3), document.documentElement.removeEventListener("click", this._a2), this.m.removeEventListener("mouseover", this._a0), this.m.removeEventListener("click", this._a1), this.d.dropdownContainer && (this.g || window.removeEventListener("scroll", this._a4), this.dropdown.parentNode && this.dropdown.parentNode.removeChild(this.dropdown)), this._m2("close:countrydropdown")
                    }
                }, {
                    key: "_3",
                    value: function(a, b) {
                        var c = this.m,
                            d = window.pageYOffset || document.documentElement.scrollTop,
                            e = c.offsetHeight,
                            f = c.getBoundingClientRect().top + d,
                            g = f + e,
                            h = a.offsetHeight,
                            i = a.getBoundingClientRect().top + d,
                            j = i + h,
                            k = i - f + c.scrollTop,
                            l = e / 2 - h / 2;
                        if (i < f) b && (k -= l), c.scrollTop = k;
                        else if (j > g) {
                            b && (k += l);
                            var m = e - h;
                            c.scrollTop = k - m
                        }
                    }
                }, {
                    key: "_4",
                    value: function(a, b) {
                        var c, d = this.a.value,
                            e = "+".concat(a);
                        if ("+" === d.charAt(0)) {
                            var f = this._5(d);
                            c = f ? d.replace(f, e) : e
                        } else {
                            if (this.d.nationalMode || this.d.separateDialCode) return;
                            if (d) c = e + d;
                            else {
                                if (!b && this.d.autoHideDialCode) return;
                                c = e
                            }
                        }
                        this.a.value = c
                    }
                }, {
                    key: "_5",
                    value: function(a, b) {
                        var c = "";
                        if ("+" === a.charAt(0))
                            for (var d = "", e = 0; e < a.length; e++) {
                                var f = a.charAt(e);
                                if (!isNaN(parseInt(f, 10))) {
                                    if (d += f, b) this.q[d] && (c = a.substr(0, e + 1));
                                    else if (this.dialCodes[d]) {
                                        c = a.substr(0, e + 1);
                                        break
                                    }
                                    if (d.length === this.countryCodeMaxLen) break
                                }
                            }
                        return c
                    }
                }, {
                    key: "_6",
                    value: function() {
                        var a = this.a.value.trim(),
                            b = this.s.dialCode,
                            c = this._m(a);
                        return (this.d.separateDialCode && "+" !== a.charAt(0) && b && c ? "+".concat(b) : "") + a
                    }
                }, {
                    key: "_7",
                    value: function(a) {
                        var b = a;
                        if (this.d.separateDialCode) {
                            var c = this._5(b);
                            if (c) {
                                c = "+".concat(this.s.dialCode);
                                var d = " " === b[c.length] || "-" === b[c.length] ? c.length + 1 : c.length;
                                b = b.substr(d)
                            }
                        }
                        return this._j2(b)
                    }
                }, {
                    key: "_m2CountryChange",
                    value: function() {
                        this._m2("countrychange")
                    }
                }, {
                    key: "handleAutoCountry",
                    value: function() {
                        "auto" === this.d.initialCountry && (this.j = window.intlTelInputGlobals.autoCountry, this.a.value || this.setCountry(this.j), this.h())
                    }
                }, {
                    key: "handleUtils",
                    value: function() {
                        window.intlTelInputUtils && (this.a.value && this._u(this.a.value), this._0()), this.i0()
                    }
                }, {
                    key: "destroy",
                    value: function() {
                        var a = this.a.form;
                        if (this.d.allowDropdown) {
                            this._2(), this.selectedFlag.removeEventListener("click", this._a10), this.k.removeEventListener("keydown", this._a11);
                            var b = this._i1();
                            b && b.removeEventListener("click", this._a9)
                        }
                        this.hiddenInput && a && a.removeEventListener("submit", this._a14), this.d.autoHideDialCode && (a && a.removeEventListener("submit", this._a8), this.a.removeEventListener("blur", this._a8)), this.a.removeEventListener("keyup", this._a12), this.a.removeEventListener("cut", this._a13), this.a.removeEventListener("paste", this._a13), this.a.removeAttribute("data-intl-tel-input-id");
                        var c = this.a.parentNode;
                        c.parentNode.insertBefore(this.a, c), c.parentNode.removeChild(c), delete window.intlTelInputGlobals.instances[this.id]
                    }
                }, {
                    key: "getExtension",
                    value: function() {
                        return window.intlTelInputUtils ? intlTelInputUtils.getExtension(this._6(), this.s.iso2) : ""
                    }
                }, {
                    key: "getNumber",
                    value: function(a) {
                        if (window.intlTelInputUtils) {
                            var b = this.s.iso2;
                            return intlTelInputUtils.formatNumber(this._6(), b, a)
                        }
                        return ""
                    }
                }, {
                    key: "getNumberType",
                    value: function() {
                        return window.intlTelInputUtils ? intlTelInputUtils.getNumberType(this._6(), this.s.iso2) : -99
                    }
                }, {
                    key: "getSelectedCountryData",
                    value: function() {
                        return this.s
                    }
                }, {
                    key: "getValidationError",
                    value: function() {
                        if (window.intlTelInputUtils) {
                            var a = this.s.iso2;
                            return intlTelInputUtils.getValidationError(this._6(), a)
                        }
                        return -99
                    }
                }, {
                    key: "isValidNumber",
                    value: function() {
                        var a = this._6().trim(),
                            b = this.d.nationalMode ? this.s.iso2 : "";
                        return window.intlTelInputUtils ? intlTelInputUtils.isValidNumber(a, b) : null
                    }
                }, {
                    key: "setCountry",
                    value: function(a) {
                        var b = a.toLowerCase();
                        this.l.classList.contains("iti__".concat(b)) || (this._z(b), this._4(this.s.dialCode, !1), this._m2CountryChange())
                    }
                }, {
                    key: "setNumber",
                    value: function(a) {
                        var b = this._v(a);
                        this._u(a), b && this._m2CountryChange()
                    }
                }, {
                    key: "setPlaceholderNumberType",
                    value: function(a) {
                        this.d.placeholderNumberType = a, this._0()
                    }
                }]), c
            }();
        h.getCountryData = function() {
            return e
        };
        var o = function(a, b, c) {
            var d = document.createElement("script");
            d.onload = function() {
                m("handleUtils"), b && b()
            }, d.onerror = function() {
                m("rejectUtilsScriptPromise"), c && c()
            }, d.className = "iti-load-utils", d.async = !0, d.src = a, document.body.appendChild(d)
        };
        return h.loadUtils = function(a) {
                if (!window.intlTelInputUtils && !window.intlTelInputGlobals.startedLoadingUtilsScript) {
                    if (window.intlTelInputGlobals.startedLoadingUtilsScript = !0, "undefined" != typeof Promise) return new Promise(function(b, c) {
                        return o(a, b, c)
                    });
                    o(a)
                }
                return null
            }, h.defaults = j, h.version = "17.0.12",
            function(a, b) {
                var c = new n(a, b);
                return c._init(), a.setAttribute("data-intl-tel-input-id", c.id), window.intlTelInputGlobals.instances[c.id] = c, c
            }
    }()
});