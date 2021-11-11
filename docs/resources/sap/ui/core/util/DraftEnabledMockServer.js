/*
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/base/util/isEmptyObject","jquery.sap.sjax"],function(t,a){"use strict";return{_oDraftMetadata:{},_oConstants:{COM_SAP_VOCABULARIES_COMMON_V1_DRAFTROOT:"com.sap.vocabularies.Common.v1.DraftRoot",COM_SAP_VOCABULARIES_COMMON_V1_DRAFTNODE:"com.sap.vocabularies.Common.v1.DraftNode",COM_SAP_VOCABULARIES_COMMON_V1_SEMANTICKEY:"com.sap.vocabularies.Common.v1.SemanticKey",EMPTY_GUID:"00000000-0000-0000-0000-000000000000",SIBLINGENTITY_NAVIGATION:"SiblingEntity",DRAFT_ADMINISTRATIVE_DATA:"DraftAdministrativeData",DRAFT_ADMINISTRATIVE_DATA_UUID:"DraftAdministrativeDataUUID",ACTIVATION_ACTION:"ActivationAction",EDIT_ACTION:"EditAction",VALIDATE_ACTION:"ValidationFunction",PREPARE_ACTION:"PreparationAction"},handleDraft:function(a,e){var r=function(t){var a=t.getParameter("oEntity");a.IsActiveEntity=false;a.HasActiveEntity=false;a.HasDraftEntity=false};var o=function(a){var e=a.getParameter("oXhr");var r=t.sap.sjax({url:e.url,dataType:"json"}).data.d;for(var o=0;o<this._oDraftMetadata.draftNodes.length;o++){for(var i in this._mEntitySets[this._oDraftMetadata.draftRootName].navprops){if(this._mEntitySets[this._oDraftMetadata.draftRootName].navprops[i].to.entitySet===this._oDraftMetadata.draftNodes[o]){var s=t.sap.sjax({url:r[i].__deferred.uri,dataType:"json"});if(s.data&&s.data.d&&s.data.d.results){var n;for(var f=0;f<s.data.d.results.length;f++){n=s.data.d.results[f];t.sap.sjax({url:n.__metadata.uri,type:"DELETE"})}}}}}};var i=sap.ui.require("sap/ui/core/util/MockServer");if(a&&a.EntityContainer){var s=a.EntityContainer[Object.keys(a.EntityContainer)[0]];for(var n in s){var f=s[n];if(f[this._oConstants.COM_SAP_VOCABULARIES_COMMON_V1_DRAFTROOT]){this._oDraftMetadata.draftRootName=n;this._oDraftMetadata.annotations=a;this._oDraftMetadata.mockServerRootUri=e.getRootUri();if(f[this._oConstants.COM_SAP_VOCABULARIES_COMMON_V1_DRAFTROOT][this._oConstants.ACTIVATION_ACTION]){this._oDraftMetadata.draftRootActivationName=f[this._oConstants.COM_SAP_VOCABULARIES_COMMON_V1_DRAFTROOT][this._oConstants.ACTIVATION_ACTION].String}if(this._oDraftMetadata.draftRootActivationName){this._oDraftMetadata.draftRootActivationName=this._oDraftMetadata.draftRootActivationName.substring(this._oDraftMetadata.draftRootActivationName.lastIndexOf("/")+1)}this._oDraftMetadata.draftRootEditName=f[this._oConstants.COM_SAP_VOCABULARIES_COMMON_V1_DRAFTROOT][this._oConstants.EDIT_ACTION];this._oDraftMetadata.draftRootEditName=this._oDraftMetadata.draftRootEditName?this._oDraftMetadata.draftRootEditName.String:undefined;if(this._oDraftMetadata.draftRootEditName){this._oDraftMetadata.draftRootEditName=this._oDraftMetadata.draftRootEditName.substring(this._oDraftMetadata.draftRootEditName.lastIndexOf("/")+1)}this._oDraftMetadata.draftRootValidationName=f[this._oConstants.COM_SAP_VOCABULARIES_COMMON_V1_DRAFTROOT][this._oConstants.VALIDATE_ACTION];this._oDraftMetadata.draftRootValidationName=this._oDraftMetadata.draftRootValidationName?this._oDraftMetadata.draftRootValidationName.String:undefined;if(this._oDraftMetadata.draftRootValidationName){this._oDraftMetadata.draftRootValidationName=this._oDraftMetadata.draftRootValidationName.substring(this._oDraftMetadata.draftRootValidationName.lastIndexOf("/")+1)}this._oDraftMetadata.draftRootPreparationtionName=f[this._oConstants.COM_SAP_VOCABULARIES_COMMON_V1_DRAFTROOT][this._oConstants.PREPARE_ACTION];this._oDraftMetadata.draftRootPreparationtionName=this._oDraftMetadata.draftRootPreparationtionName?this._oDraftMetadata.draftRootPreparationtionName.String:undefined;if(this._oDraftMetadata.draftRootPreparationtionName){this._oDraftMetadata.draftRootPreparationtionName=this._oDraftMetadata.draftRootPreparationtionName.substring(this._oDraftMetadata.draftRootPreparationtionName.lastIndexOf("/")+1)}t.extend(e,this);e.attachAfter(i.HTTPMETHOD.POST,r,this._oDraftMetadata.draftRootName);e.attachBefore(i.HTTPMETHOD.DELETE,o,this._oDraftMetadata.draftRootName);e.attachAfter(i.HTTPMETHOD.GET,this._fnDraftAdministrativeData,this._oDraftMetadata.draftRootName)}}}},_calcSemanticKeys:function(t,a){var e=[];for(var r in this._oDraftMetadata.annotations){if(r.lastIndexOf(a[t].type)>-1){e=this._oDraftMetadata.annotations[r][this._oConstants.COM_SAP_VOCABULARIES_COMMON_V1_SEMANTICKEY]||[];break}}var o=[];var i;for(var s=0;s<e.length;s++){i=e[s];for(var n in i){o.push(i[n])}}return o},_prepareDraftMetadata:function(t){var a=this;var e=sap.ui.require("sap/ui/core/util/MockServer");this._oDraftMetadata.draftNodes=[];this._oDraftMetadata.draftRootKey=t[this._oDraftMetadata.draftRootName].keys.filter(function(e){return a._calcSemanticKeys(a._oDraftMetadata.draftRootName,t).indexOf(e)<0})[0];var r=a._oDraftMetadata.annotations;var o=r.EntityContainer[Object.keys(r.EntityContainer)[0]];for(var i in o){var s=o[i];if(s[a._oConstants.COM_SAP_VOCABULARIES_COMMON_V1_DRAFTNODE]){this._oDraftMetadata.draftNodes.push(i)}}for(var n=0;n<this._oDraftMetadata.draftNodes.length;n++){this.attachAfter(e.HTTPMETHOD.GET,this._fnDraftAdministrativeData,this._oDraftMetadata.draftNodes[n])}},_fnDraftAdministrativeData:function(t){var e={};var r=t.getParameter("oFilteredData");if(!r){e=t.getParameter("oEntry");if(e.IsActiveEntity&&!e.HasDraftEntity){e[this._oConstants.DRAFT_ADMINISTRATIVE_DATA]=null}}else{if(r.results){r=r.results}else{if(a(r)){r=null;return}}for(var o=0;o<r.length;o++){e=r[o];if(e.IsActiveEntity&&!e.HasDraftEntity){e[this._oConstants.DRAFT_ADMINISTRATIVE_DATA]=null}}}},_handleDraftArtifacts:function(a){var e=this;var r=this._oMockdata;var o=r[this._oDraftMetadata.draftRootName];var i=function(t,a){return t.filter(function(t){return a.indexOf(t)<0})[0]};if(o.length===100){for(var s=0;s<o.length;s++){var n=o[s];if(s<25){n.IsActiveEntity=true;n.HasActiveEntity=false;n.HasDraftEntity=false;n[this._oDraftMetadata.draftRootKey]=this._oConstants.EMPTY_GUID;if(n[this._oConstants.DRAFT_ADMINISTRATIVE_DATA_UUID]){n[this._oConstants.DRAFT_ADMINISTRATIVE_DATA_UUID]=null}var f=[];var d=[];for(var _=0;_<this._oDraftMetadata.draftNodes.length;_++){d=this._calcSemanticKeys(this._oDraftMetadata.draftNodes[_],a);f=r[this._oDraftMetadata.draftNodes[_]];var D=a[this._oDraftMetadata.draftRootName];for(var h in D.navprops){var v=D.navprops[h];if(v.to.entitySet===this._oDraftMetadata.draftNodes[_]){var u=v.from.propRef.length;for(var M=0;M<u;M++){f[s][v.to.propRef[M]]=n[v.from.propRef[M]]}}}f[s].IsActiveEntity=true;f[s].HasActiveEntity=false;f[s].HasDraftEntity=false;f[s][this._oDraftMetadata.draftRootKey]=this._oConstants.EMPTY_GUID;if(f[s][this._oConstants.DRAFT_ADMINISTRATIVE_DATA_UUID]){f[s][this._oConstants.DRAFT_ADMINISTRATIVE_DATA_UUID]=null}var p=i(a[this._oDraftMetadata.draftNodes[_]].keys,d);f[s][p]=this._oConstants.EMPTY_GUID}}else if(s<50){n.IsActiveEntity=false;n.HasActiveEntity=false;n.HasDraftEntity=false;f=[];d=[];for(var _=0;_<this._oDraftMetadata.draftNodes.length;_++){d=this._calcSemanticKeys(this._oDraftMetadata.draftNodes[_],a);f=r[this._oDraftMetadata.draftNodes[_]];var D=a[this._oDraftMetadata.draftRootName];for(var h in D.navprops){var v=D.navprops[h];if(v.to.entitySet===this._oDraftMetadata.draftNodes[_]){var u=v.from.propRef.length;for(var M=0;M<u;M++){f[s][v.to.propRef[M]]=n[v.from.propRef[M]]}}}f[s].IsActiveEntity=false;f[s].HasActiveEntity=false;f[s].HasDraftEntity=false;p=i(a[this._oDraftMetadata.draftNodes[_]].keys,d)}}else if(s<75){var A=t.extend(true,{},n);n.IsActiveEntity=true;n.HasActiveEntity=false;n.HasDraftEntity=true;n[this._oDraftMetadata.draftRootKey]=this._oConstants.EMPTY_GUID;f=[];d=[];for(var _=0;_<this._oDraftMetadata.draftNodes.length;_++){d=this._calcSemanticKeys(this._oDraftMetadata.draftNodes[_],a);f=r[this._oDraftMetadata.draftNodes[_]];var D=a[this._oDraftMetadata.draftRootName];for(var h in D.navprops){var v=D.navprops[h];if(v.to.entitySet===this._oDraftMetadata.draftNodes[_]){var u=v.from.propRef.length;for(var M=0;M<u;M++){f[s][v.to.propRef[M]]=n[v.from.propRef[M]]}}}f[s].IsActiveEntity=true;f[s].HasActiveEntity=false;f[s].HasDraftEntity=true;p=i(a[this._oDraftMetadata.draftNodes[_]].keys,d);f[s][p]=this._oConstants.EMPTY_GUID}A.IsActiveEntity=false;A.HasActiveEntity=true;A.HasDraftEntity=false;o[s+25]=A}}}var E=this._getRootUri();t.each(a,function(a,o){t.each(r[a],function(r,i){i.__metadata=i.__metadata||{};i.__metadata.uri=E+a+"("+e._createKeysString(o,i)+")";i.__metadata.type=o.schema+"."+o.type;t.each(o.navprops,function(t){i[t]={__deferred:{uri:E+a+"("+e._createKeysString(o,i)+")/"+t}}})})})},_activate:function(a){var e;var r=function(t,a){return t.filter(function(t){return a.indexOf(t)<0})[0]};for(var o=0;o<this._oDraftMetadata.draftNodes.length;o++){for(var i in this._mEntitySets[this._oDraftMetadata.draftRootName].navprops){if(this._mEntitySets[this._oDraftMetadata.draftRootName].navprops[i].to.entitySet===this._oDraftMetadata.draftNodes[o]){e=t.sap.sjax({url:a[i].__deferred.uri,dataType:"json"});if(e.success&&e.data&&e.data.d&&e.data.d.results){var s;for(var n=0;n<e.data.d.results.length;n++){s=e.data.d.results[n];s.IsActiveEntity=true;s.HasActiveEntity=false;s.HasDraftEntity=false;s[this._oDraftMetadata.draftRootKey]=this._oConstants.EMPTY_GUID;var f=this._calcSemanticKeys(this._oDraftMetadata.draftNodes[o],this._mEntitySets);var d=r(this._mEntitySets[this._oDraftMetadata.draftNodes[o]].keys,f);s[d]=this._oConstants.EMPTY_GUID;t.sap.sjax({url:s.__metadata.uri,type:"PATCH",data:JSON.stringify(s)})}}}}}a.IsActiveEntity=true;a.HasActiveEntity=false;a.HasDraftEntity=false;a[this._oDraftMetadata.draftRootKey]=this._oConstants.EMPTY_GUID;t.sap.sjax({url:a.__metadata.uri,type:"PATCH",data:JSON.stringify(a)});return a},setRequests:function(e){var r=this;var o=sap.ui.require("sap/ui/core/util/MockServer");e.push({method:"POST",path:new RegExp(r._oDraftMetadata.draftRootActivationName),response:function(a){var e=JSON.parse(a.requestBody);var o=[];for(var i in e){o.push(i+" eq "+e[i])}var s=t.sap.sjax({url:r._oDraftMetadata.mockServerRootUri+r._oDraftMetadata.draftRootName+"?$filter="+o.join(" and "),dataType:"json"});if(!s.success||!s.data.d.results[0]){a.respond(404)}var n=s.data.d.results[0];if(n.IsActiveEntity){a.respond(400)}if(n.HasActiveEntity){var f=n.SiblingEntity.__deferred.uri;s=t.sap.sjax({url:f,dataType:"json"});if(s.success&&s.data&&s.data.d.__metadata){var d=s.data.d;s=t.sap.sjax({url:d.__metadata.uri,type:"DELETE"})}}n=r._activate(n);a.respondJSON(200,{},JSON.stringify({d:n}));return true}});if(r._oDraftMetadata.draftRootEditName){e.push({method:"POST",path:new RegExp(r._oDraftMetadata.draftRootEditName+"(\\?(.*))?"),response:function(e,o){var i=[];var s=JSON.parse(e.requestBody);if(s&&!a(s)){for(var n in s){i.push(n+" eq "+s[n])}}else{var f=decodeURIComponent(o).replace("?","&").split("&");for(var d in f){var _=f[d];var D=new RegExp("(.*)=(.*)");var h;if(_){h=D.exec(_);i.push(h[1]+" eq "+h[2])}}}var v=t.sap.sjax({url:r._oDraftMetadata.mockServerRootUri+r._oDraftMetadata.draftRootName+"?$filter="+i.join(" and "),dataType:"json"});if(!v.success||!v.data.d.results[0]){e.respond(404)}var u=v.data.d.results[0];if(!u.IsActiveEntity||u.HasDraftEntity){e.respond(400)}var M=t.extend(true,{},u);M.IsActiveEntity=false;M.HasActiveEntity=true;M.HasDraftEntity=false;M[r._oDraftMetadata.draftRootKey]=r._generatePropertyValue(r._oDraftMetadata.draftRootKey,"Guid");var p=r._getRootUri();var A=r._mEntitySets[r._oDraftMetadata.draftRootName];M.__metadata=M.__metadata||{};M.__metadata.uri=p+r._oDraftMetadata.draftRootName+"("+r._createKeysString(A,M)+")";M.__metadata.type=A.schema+"."+A.type;t.each(A.navprops,function(t){M[t]={__deferred:{uri:p+r._oDraftMetadata.draftRootName+"("+r._createKeysString(A,M)+")/"+t}}});r._oMockdata[r._oDraftMetadata.draftRootName].push(M);v=t.sap.sjax({url:u.__metadata.uri,type:"PATCH",data:JSON.stringify({HasDraftEntity:true})});e.respondJSON(200,{},JSON.stringify({d:M}));return true}})}if(r._oDraftMetadata.draftRootValidationName){e.push({method:"GET",path:new RegExp(r._oDraftMetadata.draftRootValidationName+"(\\?(.*))?"),response:function(t,a){var e=r._oDraftMetadata.draftRootValidationName;r.fireEvent(o.HTTPMETHOD.GET+e+":before",{oXhr:t,sUrlParams:a});r.fireEvent(o.HTTPMETHOD.GET+":before",{oXhr:t,sUrlParams:a});var i={d:{}};i.d[e]={__metadata:{type:"ValidationResult"},IsValid:true};r.fireEvent(o.HTTPMETHOD.GET+e+":after",{oXhr:t,oResult:i});r.fireEvent(o.HTTPMETHOD.GET+":after",{oXhr:t,oResult:i});t.respondJSON(200,{},JSON.stringify(i));return true}})}if(r._oDraftMetadata.draftRootPreparationtionName){e.push({method:"POST",path:new RegExp(r._oDraftMetadata.draftRootPreparationtionName),response:function(a){r.fireEvent(o.HTTPMETHOD.POST+r._oDraftMetadata.draftRootPreparationtionName+":before",{oXhr:a});r.fireEvent(o.HTTPMETHOD.POST+":before",{oXhr:a});var e=JSON.parse(a.requestBody);var i=[];for(var s in e){i.push(s+" eq "+e[s])}var n=t.sap.sjax({url:r._oDraftMetadata.mockServerRootUri+r._oDraftMetadata.draftRootName+"?$filter="+i.join(" and "),dataType:"json"});if(!n.success||!n.data.d.results[0]){a.respond(404)}var f=n.data.d.results[0];r.fireEvent(o.HTTPMETHOD.POST+r._oDraftMetadata.draftRootPreparationtionName+":after",{oXhr:a,oEntry:f});r.fireEvent(o.HTTPMETHOD.POST+":after",{oXhr:a,oEntry:f});a.respondJSON(200,{},JSON.stringify({d:f}));return true}})}o.prototype.setRequests.apply(this,[e])},_generateMockdata:function(t,a){var e=sap.ui.require("sap/ui/core/util/MockServer");e.prototype._generateMockdata.apply(this,[t,a]);this._handleDraftArtifacts(t)},_loadMockdata:function(t,a){var e=sap.ui.require("sap/ui/core/util/MockServer");e.prototype._loadMockdata.apply(this,[t,a]);this._handleDraftArtifacts(t)},_resolveNavigation:function(t,a,e,r){var o=sap.ui.require("sap/ui/core/util/MockServer");var i=o.prototype._resolveNavigation.apply(this,[t,a,e,r]);if(e===this._oConstants.SIBLINGENTITY_NAVIGATION){if(r&&r.IsActiveEntity){i.splice(0,1)}else{i.length>1?i.splice(1,1):i.splice(0,1)}}else if(e===this._oConstants.DRAFT_ADMINISTRATIVE_DATA){if(r){if(r.IsActiveEntity&&!r.HasDraftEntity){i[0]=null}}else{i[0]=null}}return i},_findEntitySets:function(t){var a=sap.ui.require("sap/ui/core/util/MockServer");var e=a.prototype._findEntitySets.apply(this,[t]);this._prepareDraftMetadata(e);return e},getEntitySetData:function(t){var a=sap.ui.require("sap/ui/core/util/MockServer");var e=a.prototype.getEntitySetData.apply(this,[t]);var r=function(){return e};if(t===this._oDraftMetadata.draftRootName){this._fnDraftAdministrativeData({getParameter:r});return e}for(var o=0;o<this._oDraftMetadata.draftNodes.length;o++){if(t===this._oDraftMetadata.draftNodes[o]){this._fnDraftAdministrativeData({getParameter:r});return e}}return e}}},true);