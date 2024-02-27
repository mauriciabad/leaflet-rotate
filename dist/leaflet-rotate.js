!function(t){"function"==typeof define&&define.amd?define(t):t()}((function(){"use strict";const t=L.extend({},L.DomUtil);L.extend(L.DomUtil,{setTransform:function(o,e,i,n,a){var s=e||new L.Point(0,0);if(!n)return e=s._round(),t.setTransform.apply(this,arguments);s=s.rotateFrom(n,a),o.style[L.DomUtil.TRANSFORM]="translate3d("+s.x+"px,"+s.y+"px,0)"+(i?" scale("+i+")":"")+" rotate("+n+"rad)"},setPosition:function(o,e,i,n,a){if(!i)return t.setPosition.apply(this,arguments);o._leaflet_pos=e,L.Browser.any3d?L.DomUtil.setTransform(o,e,a,i,n):(o.style.left=e.x+"px",o.style.top=e.y+"px")},DEG_TO_RAD:Math.PI/180,RAD_TO_DEG:180/Math.PI}),L.Draggable.include({}),L.extend(L.Point.prototype,{rotate:function(t){return this.rotateFrom(t,new L.Point(0,0))},rotateFrom:function(t,o){if(!t)return this;var e=Math.sin(t),i=Math.cos(t),n=o.x,a=o.y,s=this.x-n,r=this.y-a;return new L.Point(s*i-r*e+n,s*e+r*i+a)}});const o=L.extend({},L.DivOverlay.prototype);L.DivOverlay.include({getEvents:function(){return L.extend(o.getEvents.apply(this,arguments),{rotate:this._updatePosition})},_updatePosition:function(){if(this._map&&(o._updatePosition.apply(this,arguments),this._map&&this._map._rotate&&this._zoomAnimated)){var t=this._getAnchor(),e=L.DomUtil.getPosition(this._container).subtract(t);L.DomUtil.setPosition(this._container,this._map.rotatedPointToMapPanePoint(e).add(t))}}});const e=L.extend({},L.Popup.prototype);L.Popup.include({_animateZoom:function(t){if(e._animateZoom.apply(this,arguments),this._map&&this._map._rotate){var o=this._getAnchor(),i=L.DomUtil.getPosition(this._container).subtract(o);L.DomUtil.setPosition(this._container,this._map.rotatedPointToMapPanePoint(i).add(o))}},_adjustPan:function(){if(!(!this.options.autoPan||this._map._panAnim&&this._map._panAnim._inProgress))if(this._autopanning)this._autopanning=!1;else{var t=this._map,o=parseInt(L.DomUtil.getStyle(this._container,"marginBottom"),10)||0,e=this._container.offsetHeight+o,i=this._containerWidth,n=new L.Point(this._containerLeft,-e-this._containerBottom);n._add(L.DomUtil.getPosition(this._container));var a=n._add(this._map._getMapPanePos()),s=L.point(this.options.autoPanPadding),r=L.point(this.options.autoPanPaddingTopLeft||s),h=L.point(this.options.autoPanPaddingBottomRight||s),_=t.getSize(),d=0,p=0;a.x+i+h.x>_.x&&(d=a.x+i-_.x+h.x),a.x-d-r.x<0&&(d=a.x-r.x),a.y+e+h.y>_.y&&(p=a.y+e-_.y+h.y),a.y-p-r.y<0&&(p=a.y-r.y),(d||p)&&(this.options.keepInView&&(this._autopanning=!0),t.fire("autopanstart").panBy([d,p]))}}});const i=L.extend({},L.Tooltip.prototype);L.Tooltip.include({_animateZoom:function(t){if(!this._map._rotate)return i._animateZoom.apply(this,arguments);var o=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center);o=this._map.rotatedPointToMapPanePoint(o),this._setPosition(o)},_updatePosition:function(){if(!this._map._rotate)return i._updatePosition.apply(this,arguments);var t=this._map.latLngToLayerPoint(this._latlng);t=this._map.rotatedPointToMapPanePoint(t),this._setPosition(t)}}),L.extend({},L.Icon.prototype),L.Icon.include({_setIconStyles:function(t,o){var e=this.options,i=e[o+"Size"];"number"==typeof i&&(i=[i,i]);var n=L.point(i),a=L.point("shadow"===o&&e.shadowAnchor||e.iconAnchor||n&&n.divideBy(2,!0));t.className="leaflet-marker-"+o+" "+(e.className||""),a&&(t.style.marginLeft=-a.x+"px",t.style.marginTop=-a.y+"px",t.style[L.DomUtil.TRANSFORM+"Origin"]=a.x+"px "+a.y+"px 0px"),n&&(t.style.width=n.x+"px",t.style.height=n.y+"px")}});const n=L.extend({},L.Marker.prototype);var a;L.Marker.mergeOptions({rotation:0,rotateWithView:!1,scale:void 0});var s={_onDrag:function(t){var o=this._marker,e=o.options.rotation||o.options.rotateWithView,i=o._shadow,n=L.DomUtil.getPosition(o._icon);!e&&i&&L.DomUtil.setPosition(i,n),o._map._rotate&&(n=o._map.mapPanePointToRotatedPoint(n));var a=o._map.layerPointToLatLng(n);o._latlng=a,t.latlng=a,t.oldLatLng=this._oldLatLng,e?o.setLatLng(a):o.fire("move",t),o.fire("drag",t)},_onDragEnd:function(t){this._marker._map._rotate&&this._marker.update(),a._onDragEnd.apply(this,arguments)}};L.Marker.include({getEvents:function(){return L.extend(n.getEvents.apply(this,arguments),{rotate:this.update})},_initInteraction:function(){var t=n._initInteraction.apply(this,arguments);return this.dragging&&this.dragging.enabled()&&this._map&&this._map._rotate&&(a=a||Object.getPrototypeOf(this.dragging),this.dragging.disable(),Object.assign(this.dragging,{_onDrag:s._onDrag.bind(this.dragging),_onDragEnd:s._onDragEnd.bind(this.dragging)}),this.dragging.enable()),t},_setPos:function(t){this._map._rotate&&(t=this._map.rotatedPointToMapPanePoint(t));var o=this.options.rotation||0;this.options.rotateWithView&&(o+=this._map._bearing),this._icon&&L.DomUtil.setPosition(this._icon,t,o,t,this.options.scale),this._shadow&&L.DomUtil.setPosition(this._shadow,t,o,t,this.options.scale),this._zIndex=t.y+this.options.zIndexOffset,this._resetZIndex()},setRotation:function(t){this.options.rotation=t,this.update()}});const r=L.extend({},L.GridLayer.prototype);L.GridLayer.include({getEvents:function(){var t=r.getEvents.apply(this,arguments);return this._map._rotate&&!this.options.updateWhenIdle&&(this._onRotate||(this._onRotate=L.Util.throttle(this._onMoveEnd,this.options.updateInterval,this)),t.rotate=this._onRotate),t},_getTiledPixelBounds:function(t){return this._map._rotate?this._map._getNewPixelBounds(t,this._tileZoom):r._getTiledPixelBounds.apply(this,arguments)}});const h=L.extend({},L.Renderer.prototype);L.Renderer.include({getEvents:function(){return L.extend(h.getEvents.apply(this,arguments),{rotate:this._update})},onAdd:function(){h.onAdd.apply(this,arguments),L.version<="1.9.3"&&this._container.classList.add("leaflet-zoom-animated")},_updateTransform:function(t,o){if(!this._map._rotate)return h._updateTransform.apply(this,arguments);var e=this._map.getZoomScale(o,this._zoom),i=this._map._latLngToNewLayerPoint(this._topLeft,o,t);L.DomUtil.setTransform(this._container,i,e)},_update:function(){if(!this._map._rotate)return h._update.apply(this,arguments);this._bounds=this._map._getPaddedPixelBounds(this.options.padding),this._topLeft=this._map.layerPointToLatLng(this._bounds.min),this._center=this._map.getCenter(),this._zoom=this._map.getZoom()}});const _=L.extend({},L.Map.prototype);L.Map.mergeOptions({rotate:!1,bearing:0}),L.Map.include({initialize:function(t,o){o.rotate&&(this._rotate=!0,this._bearing=0),_.initialize.apply(this,arguments),this.options.rotate&&this.setBearing(this.options.bearing)},containerPointToLayerPoint:function(t){return this._rotate?L.point(t).subtract(this._getMapPanePos()).rotateFrom(-this._bearing,this._getRotatePanePos()).subtract(this._getRotatePanePos()):_.containerPointToLayerPoint.apply(this,arguments)},layerPointToContainerPoint:function(t){return this._rotate?L.point(t).add(this._getRotatePanePos()).rotateFrom(this._bearing,this._getRotatePanePos()).add(this._getMapPanePos()):_.layerPointToContainerPoint.apply(this,arguments)},rotatedPointToMapPanePoint:function(t){return L.point(t).rotate(this._bearing)._add(this._getRotatePanePos())},mapPanePointToRotatedPoint:function(t){return L.point(t)._subtract(this._getRotatePanePos()).rotate(-this._bearing)},mapBoundsToContainerBounds:function(t){if(!this._rotate&&_.mapBoundsToContainerBounds)return _.mapBoundsToContainerBounds.apply(this,arguments);const o=this.getPixelOrigin(),e=this.layerPointToContainerPoint(this.project(t.getNorthWest())._subtract(o)),i=this.layerPointToContainerPoint(this.project(t.getNorthEast())._subtract(o)),n=this.layerPointToContainerPoint(this.project(t.getSouthWest())._subtract(o)),a=this.layerPointToContainerPoint(this.project(t.getSouthEast())._subtract(o));return L.bounds([L.point(Math.min(e.x,i.x,a.x,n.x),Math.min(e.y,i.y,a.y,n.y)),L.point(Math.max(e.x,i.x,a.x,n.x),Math.max(e.y,i.y,a.y,n.y))])},getBounds:function(){if(!this._rotate)return _.getBounds.apply(this,arguments);var t=this.getSize();return new L.LatLngBounds([this.containerPointToLatLng([0,0]),this.containerPointToLatLng([t.x,0]),this.containerPointToLatLng([t.x,t.y]),this.containerPointToLatLng([0,t.y])])},setBearing:function(t){if(L.Browser.any3d&&this._rotate){var o=L.Util.wrapNum(t,[0,360])*L.DomUtil.DEG_TO_RAD,e=this._getPixelCenter(),i=this._getRotatePanePos().rotateFrom(-this._bearing,e),n=i.rotateFrom(o,e);L.DomUtil.setPosition(this._rotatePane,i,o,e),this._pivot=e,this._bearing=o,this._rotatePanePos=n,this.fire("rotate")}},getBearing:function(){return this._bearing*L.DomUtil.RAD_TO_DEG},_initPanes:function(){var t=this._panes={};this._paneRenderers={},this._mapPane=this.createPane("mapPane",this._container),L.DomUtil.setPosition(this._mapPane,new L.Point(0,0)),this._rotate?(this._rotatePane=this.createPane("rotatePane",this._mapPane),this._norotatePane=this.createPane("norotatePane",this._mapPane),this.createPane("tilePane",this._rotatePane),this.createPane("overlayPane",this._rotatePane),this.createPane("shadowPane",this._norotatePane),this.createPane("markerPane",this._norotatePane),this.createPane("tooltipPane",this._norotatePane),this.createPane("popupPane",this._norotatePane)):(this.createPane("tilePane"),this.createPane("overlayPane"),this.createPane("shadowPane"),this.createPane("markerPane"),this.createPane("tooltipPane"),this.createPane("popupPane")),this.options.markerZoomAnimation||(L.DomUtil.addClass(t.markerPane,"leaflet-zoom-hide"),L.DomUtil.addClass(t.shadowPane,"leaflet-zoom-hide"))},panInside(t,o){if(!this._rotate||Math.abs(this._bearing).toFixed(1)<.1)return _.panInside.apply(this,arguments);o=o||{};const e=L.point(o.paddingTopLeft||o.padding||[0,0]),i=L.point(o.paddingBottomRight||o.padding||[0,0]),n=this._container.getBoundingClientRect(),a=this.latLngToContainerPoint(t),s=L.bounds([L.point(n),L.point(n).add(this.getSize())]),r=s.getCenter(),h=L.bounds([s.min.add(e),s.max.subtract(i)]),d=h.getSize();if(!h.contains(a)){this._enforcingBounds=!0;const t=a.subtract(h.getCenter()),e=h.extend(a).getSize().subtract(d);r.x+=t.x<0?-e.x:e.x,r.y+=t.y<0?-e.y:e.y,this.panTo(this.containerPointToLatLng(r),o),this._enforcingBounds=!1}return this},getBoundsZoom(t,o,e){if(!this._rotate||Math.abs(this._bearing).toFixed(1)<.1)return _.getBoundsZoom.apply(this,arguments);t=L.latLngBounds(t),e=L.point(e||[0,0]);let i=this.getZoom()||0;const n=this.getMinZoom(),a=this.getMaxZoom(),s=this.getSize().subtract(e),r=this.mapBoundsToContainerBounds(t).getSize(),h=this.options.zoomSnap,d=s.x/r.x,p=s.y/r.y,l=o?Math.max(d,p):Math.min(d,p);return i=this.getScaleZoom(l,i),h&&(i=Math.round(i/(h/100))*(h/100),i=o?Math.ceil(i/h)*h:Math.floor(i/h)*h),Math.max(n,Math.min(a,i))},_getCenterOffset:function(t){var o=_._getCenterOffset.apply(this,arguments);return this._rotate&&(o=o.rotate(this._bearing)),o},_getRotatePanePos:function(){return this._rotatePanePos||new L.Point(0,0)},_getNewPixelOrigin:function(t,o){if(!this._rotate)return _._getNewPixelOrigin.apply(this,arguments);var e=this.getSize()._divideBy(2);return this.project(t,o).rotate(this._bearing)._subtract(e)._add(this._getMapPanePos())._add(this._getRotatePanePos()).rotate(-this._bearing)._round()},_getNewPixelBounds:function(t,o){if(t=t||this.getCenter(),o=o||this.getZoom(),!this._rotate&&_._getNewPixelBounds)return _._getNewPixelBounds.apply(this,arguments);var e=this._animatingZoom?Math.max(this._animateToZoom,this.getZoom()):this.getZoom(),i=this.getZoomScale(e,o),n=this.project(t,o).floor(),a=this.getSize(),s=new L.Bounds([this.containerPointToLayerPoint([0,0]).floor(),this.containerPointToLayerPoint([a.x,0]).floor(),this.containerPointToLayerPoint([0,a.y]).floor(),this.containerPointToLayerPoint([a.x,a.y]).floor()]).getSize().divideBy(2*i);return new L.Bounds(n.subtract(s),n.add(s))},_getPixelCenter:function(){return!this._rotate&&_._getPixelCenter?_._getPixelCenter.apply(this,arguments):this.getSize()._divideBy(2)._subtract(this._getMapPanePos())},_getPaddedPixelBounds:function(t){if(!this._rotate&&_._getPaddedPixelBounds)return _._getPaddedPixelBounds.apply(this,arguments);var o=t,e=this.getSize(),i=e.multiplyBy(-o),n=e.multiplyBy(1+o);return new L.Bounds([this.containerPointToLayerPoint([i.x,i.y]).floor(),this.containerPointToLayerPoint([i.x,n.y]).floor(),this.containerPointToLayerPoint([n.x,i.y]).floor(),this.containerPointToLayerPoint([n.x,n.y]).floor()])},_handleGeolocationResponse:function(t){if(this._container._leaflet_id){var o=t.coords.latitude,e=t.coords.longitude,i=t.coords.heading,n=new L.LatLng(o,e),a=n.toBounds(t.coords.accuracy),s=this._locateOptions;if(s.setView){var r=this.getBoundsZoom(a);this.setView(n,s.maxZoom?Math.min(r,s.maxZoom):r)}var h={latlng:n,bounds:a,timestamp:t.timestamp,heading:i};for(var _ in t.coords)"number"==typeof t.coords[_]&&(h[_]=t.coords[_]);this.fire("locationfound",h)}}}),L.Map.CompassBearing=L.Handler.extend({initialize:function(t){this._map=t,"ondeviceorientationabsolute"in window?this.__deviceOrientationEvent="deviceorientationabsolute":"ondeviceorientation"in window&&(this.__deviceOrientationEvent="deviceorientation"),this._throttled=L.Util.throttle(this._onDeviceOrientation,100,this)},addHooks:function(){this._map._rotate&&this.__deviceOrientationEvent?L.DomEvent.on(window,this.__deviceOrientationEvent,this._throttled,this):this.disable()},removeHooks:function(){this._map._rotate&&this.__deviceOrientationEvent&&L.DomEvent.off(window,this.__deviceOrientationEvent,this._throttled,this)},_onDeviceOrientation:function(t){var o=t.webkitCompassHeading||t.alpha,e=0;!t.absolute&&t.webkitCompassHeading&&(o=360-o),t.absolute||void 0===window.orientation||(e=window.orientation),this._map.setBearing(o-e)}}),L.Map.addInitHook("addHandler","compassBearing",L.Map.CompassBearing),L.Map.mergeOptions({trackContainerMutation:!1}),L.Map.ContainerMutation=L.Handler.extend({addHooks:function(){this._observer||(this._observer=new MutationObserver(L.Util.bind(this._map.invalidateSize,this._map))),this._observer.observe(this._map.getContainer(),{childList:!1,attributes:!0,characterData:!1,subtree:!1,attributeFilter:["style"]})},removeHooks:function(){this._observer.disconnect()}}),L.Map.addInitHook("addHandler","trackContainerMutation",L.Map.ContainerMutation),L.Map.mergeOptions({bounceAtZoomLimits:!0,touchRotateIntertia:void 0}),L.Map.TouchGestures=L.Handler.extend({initialize:function(t){this._map=t,this.rotate=!!this._map.options.touchRotate,this.zoom=!!this._map.options.touchZoom},addHooks:function(){L.DomEvent.on(this._map._container,"touchstart",this._onTouchStart,this)},removeHooks:function(){L.DomEvent.off(this._map._container,"touchstart",this._onTouchStart,this)},_onTouchStart:function(t){var o=this._map;if(t.touches&&2===t.touches.length&&!o._animatingZoom&&!this._zooming&&!this._rotating){var e=o.mouseEventToContainerPoint(t.touches[0]),i=o.mouseEventToContainerPoint(t.touches[1]),n=e.subtract(i);this._centerPoint=o.getSize()._divideBy(2),this._startLatLng=o.containerPointToLatLng(this._centerPoint),this.zoom?("center"!==o.options.touchZoom&&(this._pinchStartLatLng=o.containerPointToLatLng(e.add(i)._divideBy(2))),this._startDist=e.distanceTo(i),this._startZoom=o.getZoom(),this._zooming=!0):this._zooming=!1,this.rotate?(this._startTheta=Math.atan(n.x/n.y),this._startBearing=o.getBearing(),n.y<0&&(this._startBearing+=180),this._rotating=!0):this._rotating=!1,this._moved=!1,o._stop(),L.DomEvent.on(document,"touchmove",this._onTouchMove,this).on(document,"touchend touchcancel",this._onTouchEnd,this),L.DomEvent.preventDefault(t)}},_onTouchMove:function(t){if(t.touches&&2===t.touches.length&&(this._zooming||this._rotating)){var o,e=this._map,i=e.mouseEventToContainerPoint(t.touches[0]),n=e.mouseEventToContainerPoint(t.touches[1]),a=i.subtract(n),s=i.distanceTo(n)/this._startDist,r=e.options.touchRotateIntertia;if(this._rotating){var h=(Math.atan(a.x/a.y)-this._startTheta)*L.DomUtil.RAD_TO_DEG;a.y<0&&(h+=180),r&&h<=r&&(h=0),h&&e.setBearing(this._startBearing-h)}if(this._zooming)if(this._zoom=e.getScaleZoom(s,this._startZoom),!e.options.bounceAtZoomLimits&&(this._zoom<e.getMinZoom()&&s<1||this._zoom>e.getMaxZoom()&&s>1)&&(this._zoom=e._limitZoom(this._zoom)),"center"===e.options.touchZoom){if(this._center=this._startLatLng,1===s)return}else{if(o=i._add(n)._divideBy(2)._subtract(this._centerPoint),1===s&&0===o.x&&0===o.y)return;var _=-e.getBearing()*L.DomUtil.DEG_TO_RAD;this._center=e.unproject(e.project(this._pinchStartLatLng).subtract(o.rotate(_)))}this._moved||(e._moveStart(!0,!1),this._moved=!0),L.Util.cancelAnimFrame(this._animRequest);var d=e._move.bind(e,this._center,this._zoom,{pinch:!0,round:!1},void 0);this._animRequest=L.Util.requestAnimFrame(d,this,!0),L.DomEvent.preventDefault(t)}},_onTouchEnd:function(){this._moved&&(this._zooming||this._rotating)?(this._zooming=!1,this._rotating=!1,L.Util.cancelAnimFrame(this._animRequest),L.DomEvent.off(document,"touchmove",this._onTouchMove,this).off(document,"touchend touchcancel",this._onTouchEnd,this),this.zoom&&(this._map.options.zoomAnimation?this._map._animateZoom(this._center,this._map._limitZoom(this._zoom),!0,this._map.options.zoomSnap):this._map._resetView(this._center,this._map._limitZoom(this._zoom)))):this._zooming=!1}}),L.Map.addInitHook("addHandler","touchGestures",L.Map.TouchGestures),L.Map.mergeOptions({touchRotate:!1}),L.Map.TouchRotate=L.Handler.extend({addHooks:function(){this._map.touchGestures.enable(),this._map.touchGestures.rotate=!0},removeHooks:function(){this._map.touchGestures.rotate=!1}}),L.Map.addInitHook("addHandler","touchRotate",L.Map.TouchRotate),L.Map.mergeOptions({shiftKeyRotate:!0}),L.Map.ShiftKeyRotate=L.Handler.extend({addHooks:function(){L.DomEvent.on(this._map._container,"wheel",this._handleShiftScroll,this),this._map.shiftKeyRotate.rotate=!0},removeHooks:function(){L.DomEvent.off(this._map._container,"wheel",this._handleShiftScroll,this),this._map.shiftKeyRotate.rotate=!1},_handleShiftScroll:function(t){t.shiftKey?(t.preventDefault(),this._map.scrollWheelZoom.disable(),this._map.setBearing(this._map._bearing*L.DomUtil.RAD_TO_DEG+5*Math.sign(t.deltaY))):this._map.scrollWheelZoom.enable()}}),L.Map.addInitHook("addHandler","shiftKeyRotate",L.Map.ShiftKeyRotate),L.Map.addInitHook((function(){this.scrollWheelZoom.enabled()&&this.shiftKeyRotate.enabled()&&(this.scrollWheelZoom.disable(),this.scrollWheelZoom.enable())})),L.Map.mergeOptions({touchZoom:L.Browser.touch,bounceAtZoomLimits:!1}),L.Map.TouchZoom=L.Handler.extend({addHooks:function(){L.DomUtil.addClass(this._map._container,"leaflet-touch-zoom"),this._map.touchGestures.enable(),this._map.touchGestures.zoom=!0},removeHooks:function(){L.DomUtil.removeClass(this._map._container,"leaflet-touch-zoom"),this._map.touchGestures.zoom=!1}}),L.Map.addInitHook("addHandler","touchZoom",L.Map.TouchZoom),L.Control.Rotate=L.Control.extend({options:{position:"topleft",closeOnZeroBearing:!0},onAdd:function(t){var o=this._container=L.DomUtil.create("div","leaflet-control-rotate leaflet-bar"),e=this._arrow=L.DomUtil.create("span","leaflet-control-rotate-arrow");e.style.backgroundImage="url(\"data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23333'%3E%3Cpath d='M10.5 14l4-8 4 8h-8z'/%3E%3Cpath d='M10.5 16l4 8 4-8h-8z' fill='%23ccc'/%3E%3C/svg%3E\")",e.style.cursor="grab",e.style.display="block",e.style.width="100%",e.style.height="100%",e.style.backgroundRepeat="no-repeat",e.style.backgroundPosition="50%";var i=this._link=L.DomUtil.create("a","leaflet-control-rotate-toggle",o);return i.appendChild(e),i.href="#",i.title="Rotate map",L.DomEvent.on(i,"dblclick",L.DomEvent.stopPropagation).on(i,"mousedown",this._handleMouseDown,this).on(i,"click",L.DomEvent.stop).on(i,"click",this._cycleState,this).on(i,"click",this._refocusOnMap,this),L.Browser.any3d||L.DomUtil.addClass(i,"leaflet-disabled"),this._restyle(),t.on("rotate",this._restyle,this),this._follow=!1,this._canFollow=!1,this.options.closeOnZeroBearing&&0===t.getBearing()&&(o.style.display="none"),o},onRemove:function(t){t.off("rotate",this._restyle,this)},_handleMouseDown:function(t){L.DomEvent.stop(t),this.dragging=!0,this.dragstartX=t.pageX,this.dragstartY=t.pageY,L.DomEvent.on(document,"mousemove",this._handleMouseDrag,this).on(document,"mouseup",this._handleMouseUp,this)},_handleMouseUp:function(t){L.DomEvent.stop(t),this.dragging=!1,L.DomEvent.off(document,"mousemove",this._handleMouseDrag,this).off(document,"mouseup",this._handleMouseUp,this)},_handleMouseDrag:function(t){if(this.dragging){var o=t.clientX-this.dragstartX;this._map.setBearing(o)}},_cycleState:function(t){if(this._map){var o=this._map;o.touchRotate.enabled()||o.compassBearing.enabled()?o.compassBearing.enabled()?(o.compassBearing.disable(),o.setBearing(0),this.options.closeOnZeroBearing&&o.touchRotate.enable()):(o.touchRotate.disable(),(DeviceOrientationEvent&&DeviceOrientationEvent.requestPermission?DeviceOrientationEvent.requestPermission():Promise.resolve("granted")).then((t=>"granted"===t&&o.compassBearing.enable()))):o.touchRotate.enable(),this._restyle()}},_restyle:function(){if(this._map.options.rotate){var t=this._map,o=t.getBearing();this._arrow.style.transform="rotate("+o+"deg)",o&&this.options.closeOnZeroBearing&&(this._container.style.display="block"),t.compassBearing.enabled()?this._link.style.backgroundColor="orange":t.touchRotate.enabled()?this._link.style.backgroundColor=null:(this._link.style.backgroundColor="grey",0===o&&this.options.closeOnZeroBearing&&(this._container.style.display="none"))}else L.DomUtil.addClass(this._link,"leaflet-disabled")}}),L.control.rotate=function(t){return new L.Control.Rotate(t)},L.Map.mergeOptions({rotateControl:!0}),L.Map.addInitHook((function(){if(this.options.rotateControl){var t="object"==typeof this.options.rotateControl?this.options.rotateControl:{};this.rotateControl=L.control.rotate(t),this.addControl(this.rotateControl)}}))}));
//# sourceMappingURL=leaflet-rotate.js.map
