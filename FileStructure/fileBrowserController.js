"use strict";
angular.module('myApp')
       .controller('myController', ['$scope', '$window', 'dummyData', function ($scope, $window, dummyData) {
           var myTarget = document.getElementById('file-structure');
           myTarget.appendChild(renderList(dummyData));

           var index = 1;
           var textBoxId = 'rename_text_id';
           var elementId = '';
           var oldName = '';
           $scope.Rename = Rename;
           $scope.AddFolder = AddFolder;
           $scope.Delete = Delete;

           function renderList(obj) {
               index = !index ? 1 : index + 1;
               function capitalize(str) {
                   return str[0].toUpperCase() + str.slice(1);
               }
               var result = document.createElement('ul');
               result.style.listStyle = "none";
               for (var key in obj) {
                   var list = document.createElement('li');
                   if (typeof obj[key] === 'object' && !obj[key].fileName && typeof key === 'string') {
                       var textnode = createLabel(capitalize(key) + '_id' + index, '▼' + capitalize(key));
                       index++;
                       list.appendChild(textnode);
                       list.id = 'id_' + capitalize(key);
                       list.appendChild(renderList(obj[key]));
                   } else if (obj[key].fileName) {
                       var textnode = createLabel(capitalize(obj[key].fileName) + '_id' + index, capitalize(obj[key].fileName));
                       index++;
                       textnode.onmousedown = handleClick;
                       //textnode.onclick = expandCollapse;
                       list.appendChild(textnode);
                   }
                   result.appendChild(list);
               }
               return result;
           }

           function expandCollapse(e) {
               var menu = document.getElementById("menu-item");
               menu.style.display = "none";
               var element = e.currentTarget;
               e.stopPropagation();
               if (element.innerText.indexOf('▼') === 0) {
                   element.nextSibling.style.display = "none";
                   element.innerHTML = element.innerHTML.replace('▼', '►');
               }
               else if (element.innerText.indexOf('►') === 0) {
                   element.nextSibling.style.display = "block";
                   element.innerHTML = element.innerHTML.replace('►', '▼');
               }
           }

           function handleClick(evt) {
               switch (evt.which) {
                   case 1:
                       expandCollapse(evt);
                       break;
                   case 3:
                       evt.currentTarget.oncontextmenu = function () { return false; };
                       elementId = evt.currentTarget.id;
                       var menu = document.getElementById("menu-item");
                       menu.style.display = "block";
                       menu.style.marginLeft = evt.pageX + 'px';
                       menu.style.marginTop = evt.pageY + 'px';
                       break;
                   default:
                       break
               }
               return false;
           };

           document.body.onclick = function () {
               var menu = document.getElementById("menu-item");
               menu.style.display = "none";
           }

           function Rename() {
               var element = document.getElementById(elementId);
               var textBox = document.createElement("input");
               textBox.id = textBoxId;
               var name = '';
               if (element.innerText[0] === '▼') {
                   name = element.innerText.substring(1, element.innerText.length);
                   oldName = name;
               }
               else {
                   name = element.innerText.substring(0, element.innerText.indexOf('.'));
                   oldName = element.innerText;
               }
               textBox.value = name;
               textBox.onblur = saveNewName;
               element.parentNode.replaceChild(textBox, element);
               textBox.focus();
           }

           function saveNewName(e) {
               var inputEle = document.getElementById(textBoxId);
               if (oldName.indexOf('.') === -1) {
                   var value = !!e.currentTarget.value ? e.currentTarget.value : oldName;
                   var label = createLabel(elementId, '▼' + value);
                   inputEle.parentNode.replaceChild(label, inputEle);
               }
               else {
                   var value = !!e.currentTarget.value ? e.currentTarget.value + oldName.substring(oldName.indexOf('.'), oldName.length) : oldName;
                   var label = createLabel(elementId, value);
                   inputEle.parentNode.replaceChild(label, inputEle);
               }
           }

           function createLabel(id, value) {
               var textnode = document.createElement('label');
               textnode.id = id;
               textnode.innerText = value;
               textnode.onmousedown = handleClick;
               return textnode;
           }

           function AddFolder() {

           }

           function Delete() {
               var element = document.getElementById(elementId);
               deleteChildren(element.parentNode);
               function deleteChildren(element) {
                   if (element.children.length === 0) {
                       var parent = element.parentNode;
                       element.parentNode.removeChild(element);
                   }
                   else {
                       while (element.children.length>0)
                           deleteChildren(element.children[0]);
                   }
               }
           }
       }]);