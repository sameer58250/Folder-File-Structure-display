/// <reference path="C:\Users\sahmad28\Desktop\DevWork\FileStructure\FileStructure\scripts/angular.min.js" />
"use strict";
angular.module('myApp', [])
       .constant('dummyData', {
           folder1: {
               subFolder1: {
                   subSubFolder1: {
                       file1: { fileName: 'file1.txt', type: 'text file' },
                       file2: { fileName: 'file2.dat', type: 'dat file' }
                   }
               }
           },
           folder2: {
               subFolder2: {
                   subSubFolder2: {
                       file1: { fileName: 'file1.txt', type: 'text file' },
                       file2: { fileName: 'file2.dat', type: 'dat file' }
                   }
               }
           },
           folder3: {
               subFolder3: {
                   subSubFolder3: {
                       file1: { fileName: 'file1.txt', type: 'text file' },
                       file2: { fileName: 'file2.dat', type: 'dat file' }
                   }
               }
           },
           file1: { fileName: 'file2.dat', type: 'dat file' }
       });