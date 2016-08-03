/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        var source = new EventSource('http://CAM04474.local:9000/sse'),
            sseStatus = document.getElementsByClassName("sse status")[0],
            sseMessage = document.getElementsByClassName("sse received")[0];

        console.log(sseStatus, sseMessage);

        source.addEventListener('message', function(e) {
            console.log(e.data);

            sseStatus.innerHTML = 'message';
            sseMessage.innerHTML = e.data;
        }, false);

        source.addEventListener('open', function(e) {
            console.log("Connection was opened");
            sseStatus.innerHTML = "open";
            sseMessage.innerHTML = "";
        }, false);

        source.addEventListener('error', function(e) {
            if (e.target.readyState == EventSource.CLOSED
                || e.target.readyState == EventSource.CONNECTING) {
                console.log("Connection was closed");
                sseStatus.innerHTML = 'closed';
                sseMessage.innerHTML = "";
            }
            else {
                console.log('error: ', e);
                sseStatus.innerHTML = 'error';
                sseMessage.innerHTML = e;
            }
        }, false);

        source.addEventListener('aborted', function(e) {
            console.log("Connection aborted");
            sseStatus.innerHTML = 'aborted';
            sseMessage.innerHTML = "";
        }, false);

        source.addEventListener('end', function(e) {
            console.log("Connection ended");
            sseStatus.innerHTML = 'end';
            sseMessage.innerHTML = "";
        }, false);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
