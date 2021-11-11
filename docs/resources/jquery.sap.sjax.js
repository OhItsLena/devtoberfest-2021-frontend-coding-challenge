/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global"],function(t){"use strict";t.sap.sjaxSettings={complexResult:true,fallback:undefined};t.sap.sjax=function s(a){var e=t.extend(true,{},t.sap.sjaxSettings,a,{async:false,success:function(t,s,a){n={success:true,data:t,status:s,statusCode:a&&a.status}},error:function(t,s,a){n={success:false,data:undefined,status:s,error:a,statusCode:t.status,errorResponse:t.responseText}}});var n;t.ajax(e);if(!e.complexResult){return n.success?n.data:e.fallback}return n};t.sap.syncHead=function(s){return t.sap.sjax({type:"HEAD",url:s}).success};t.sap.syncGet=function s(a,e,n){return t.sap.sjax({url:a,data:e,type:"GET",dataType:n||"text"})};t.sap.syncPost=function s(a,e,n){return t.sap.sjax({url:a,data:e,type:"POST",dataType:n||"text"})};t.sap.syncGetText=function s(a,e,n){return t.sap.sjax({url:a,data:e,type:"GET",dataType:"text",fallback:n,complexResult:arguments.length<3})};t.sap.syncGetJSON=function s(a,e,n){return t.sap.sjax({url:a,data:e||null,type:"GET",dataType:"json",fallback:n,complexResult:arguments.length<3})};return t});