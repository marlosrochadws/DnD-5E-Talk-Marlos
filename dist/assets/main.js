/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
var SITE;
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/js/_header.js":
/*!**********************************!*\
  !*** ./src/assets/js/_header.js ***!
  \**********************************/
/***/ (function() {

eval("(function () {\n  console.log(\"hello world\");\n})();\n\n//# sourceURL=webpack://SITE/./src/assets/js/_header.js?");

/***/ }),

/***/ "./src/assets/js/_layout.js":
/*!**********************************!*\
  !*** ./src/assets/js/_layout.js ***!
  \**********************************/
/***/ (function() {

eval("(function () {\n  var intFrameWidth = window.innerWidth;\n})();\n\n//# sourceURL=webpack://SITE/./src/assets/js/_layout.js?");

/***/ }),

/***/ "./src/assets/js/includes/_diceRoll.js":
/*!*********************************************!*\
  !*** ./src/assets/js/includes/_diceRoll.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ \"./node_modules/core-js/modules/web.dom-collections.for-each.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.array.join.js */ \"./node_modules/core-js/modules/es.array.join.js\");\n/* harmony import */ var core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_join_js__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nvar diceTable = document.getElementById('canvas'); // diceTable é o canvas\n\nvar $box = new $dice.dice_box(diceTable, {\n  w: 300,\n  h: 300\n}); // Passando o container e dimensoes para a variavel de ambiente $ dice\n\nvar $chart = null;\nfunction setPlayerPic(result) {\n  switch (result) {\n    case 'feliz':\n      document.querySelector(\"[data-enemy-pic]\").setAttribute('data-enemy-pic', 'trizte');\n      document.querySelector(\"[data-player-pic]\").setAttribute('data-player-pic', 'feliz');\n      break;\n    case 'trizte':\n      document.querySelector(\"[data-enemy-pic]\").setAttribute('data-enemy-pic', 'feliz');\n      document.querySelector(\"[data-player-pic]\").setAttribute('data-player-pic', 'trizte');\n      break;\n    case 'normal':\n      document.querySelector(\"[data-enemy-pic]\").setAttribute('data-enemy-pic', 'normal');\n      document.querySelector(\"[data-player-pic]\").setAttribute('data-player-pic', 'normal');\n      break;\n  }\n}\nvar app = Vue.createApp({\n  data: function data() {\n    return {\n      // Valores que Vue vai retornar para o HTML\n      result: null,\n      // Resultado final\n      resultList: [],\n      // Lista de cada resultado\n      sum_count: 0,\n      // Somatório de quantas vezes foi executado rolagem\n      result_box: {\n        1: 0,\n        2: 0,\n        3: 0,\n        4: 0,\n        5: 0,\n        6: 0,\n        7: 0,\n        8: 0,\n        9: 0,\n        10: 0,\n        11: 0,\n        12: 0,\n        13: 0,\n        14: 0,\n        15: 0,\n        16: 0,\n        17: 0,\n        18: 0,\n        19: 0,\n        20: 0\n      },\n      // Para quantidade de resultados para cada face até 20 (REMOVIDO)\n      myChart: null // Para o char (REMOVIDO)\n    };\n  },\n  mounted: function mounted() {// cria os charts(REMOVIDO)\n    /*this.$nextTick(function () {\n        \n        $chart = new Chart(document.getElementById('myChart').getContext('2d'), {\n            type: 'bar',\n            data: {\n                labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],\n                datasets: [{\n                    label: 'Count',\n                    data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],\n                    backgroundColor: [\n                        'rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(153, 102, 255, 0.2)','rgba(255, 159, 64, 0.2)',\n                        'rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(153, 102, 255, 0.2)','rgba(255, 159, 64, 0.2)',\n                        'rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(153, 102, 255, 0.2)','rgba(255, 159, 64, 0.2)',\n                        'rgba(255, 99, 132, 0.2)','rgba(54, 162, 235, 0.2)'\n                    ],\n                    borderColor: [\n                        'rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)',\n                        'rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)',\n                        'rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)',\n                        'rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)'\n                    ],\n                    borderWidth: 1\n                }]\n            },\n            options: {\n                responsive:true,\n                maintainAspectRatio: false,\n                scales: {\n                    y: {\n                        beginAtZero: true\n                    }\n                },\n                legend:{\n                    labels:{\n                        filter: function(items) {\n                            return false;\n                        }\n                    }\n                }\n            }\n        }); \n     })*/\n  },\n  methods: {\n    calc: function calc(value) {\n      // incrementos dos resultados no data()\n      this.sum_count += 1; // incrementa quantas vezes foi executado rolagens\n\n      this.result_box[value] += 1; // Na posição do valor resultado, incrementa em 1 a quantidade\n\n      /*let data = [];\n      for(let i = 0; i <= 20; i++){\n          data[i] = this.result_box[i+1];\n      }\n      $chart.data.datasets[0].data = data;\n      $chart.update(); */\n    },\n    throw_dice: function throw_dice(dices) {\n      var self = this;\n      if (!dices) {\n        dices = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20'];\n      }\n      var resultObject = {\n        vec: null,\n        value: null\n      };\n      resultObject.vec = $box.start_throw(function (vectors, notation, callback) {\n        // before_roll\n\n        document.querySelectorAll(\"[data-throw-btn]\").forEach(function (tag) {\n          // desabilitando todos os botões de rolagem\n          tag.disabled = true;\n        });\n        diceTable.style.display = 'block'; //Mostra diceTable\n        diceTable.style.width = window.innerWidth - 1 + 'px';\n        diceTable.style.height = window.innerHeight - 1 + 'px';\n        $box.reinit(diceTable, {\n          w: 500,\n          h: 300\n        });\n        callback();\n      }, function (notation, result) {\n        // after_roll\n        document.querySelectorAll(\"[data-throw-btn]\").forEach(function (tag) {\n          // habilitando todos os botões de rolagem\n          tag.disabled = false;\n        });\n        resultObject.value = result.join(' ');\n        self.result = resultObject.value;\n        diceTable.style.display = 'none';\n        self.resultList.push(resultObject);\n        self.calc(resultObject.value);\n        setTimeout(function () {\n          // CHECK FOR POPUP\n          var popupActive = document.querySelector(\".popup-test.active\");\n          if (popupActive) {\n            var totalRollValue = 0;\n            var fieldBonus = document.querySelector(\".char-att.active [data-bonus]\");\n            var fieldRoll = document.querySelector(\".char-att.active [data-throw-result]\");\n            document.querySelector(\"[data-result-value]\").innerHTML = '';\n            document.querySelectorAll(\".result\").forEach(function (el) {\n              el.classList.remove(\"active\");\n            });\n            if (fieldBonus) {\n              var value_1 = parseInt(fieldBonus.innerHTML);\n              totalRollValue += value_1;\n            }\n            if (fieldRoll) {\n              var value_2 = parseInt(fieldRoll.innerHTML);\n              totalRollValue += value_2;\n              console.log(value_2);\n              switch (value_2) {\n                case 1:\n                  var d20Active = document.querySelector(\".char-att.active[data-roll=d20]\");\n                  if (d20Active) {\n                    document.querySelector(\"[data-critical-failure]\").classList.add('active');\n                    document.querySelector(\"[data-result-value]\").innerHTML = '';\n                    setPlayerPic('trizte');\n                  } else {\n                    document.querySelector(\"[data-result-value]\").innerHTML = totalRollValue;\n                  }\n                  break;\n                case 20:\n                  document.querySelector(\"[data-critical-success]\").classList.add('active');\n                  document.querySelector(\"[data-result-value]\").innerHTML = totalRollValue;\n                  setPlayerPic('feliz');\n                  break;\n                default:\n                  document.querySelector(\"[data-result-value]\").innerHTML = totalRollValue;\n                  setPlayerPic('normal');\n                  var difficultyElem = document.querySelector(\".test-difficulty.active [data-difficulty-class]\");\n                  if (difficultyElem) {\n                    //DIFFICULTY CLASS\n                    var difficultyClass = parseInt(difficultyElem.innerHTML);\n                    if (totalRollValue >= difficultyClass) {\n                      document.querySelector(\"[data-success]\").classList.add('active');\n                      setPlayerPic('feliz');\n                    } else if (totalRollValue < difficultyClass) {\n                      document.querySelector(\"[data-failure]\").classList.add('active');\n                      setPlayerPic('trizte');\n                    }\n                  }\n                  var savingElem = document.querySelector(\".test-saving.active [data-saving-throw]\");\n                  if (savingElem) {\n                    //SAVING THROW\n                    var savingThrow = parseInt(savingElem.innerHTML);\n                    if (totalRollValue >= savingThrow) {\n                      document.querySelector(\"[data-success]\").classList.add('active');\n                      setPlayerPic('feliz');\n                    } else if (totalRollValue < savingThrow) {\n                      document.querySelector(\"[data-failure]\").classList.add('active');\n                      setPlayerPic('trizte');\n                    }\n                  }\n                  var armorElem = document.querySelector(\".test-armor.active [data-armor-class]\");\n                  if (armorElem) {\n                    //ARMOR CLASS\n                    var armorClass = parseInt(armorElem.innerHTML);\n                    if (totalRollValue >= armorClass) {\n                      document.querySelector(\"[data-success]\").classList.add('active');\n                      setPlayerPic('feliz');\n                    } else if (totalRollValue < armorClass) {\n                      document.querySelector(\"[data-failure]\").classList.add('active');\n                      setPlayerPic('trizte');\n                    }\n                  }\n                  break;\n              }\n              ;\n              document.querySelector(\".test-result\").classList.add('active');\n            }\n          }\n        }, 200);\n      }, dices);\n    },\n    re_throw_dice: function re_throw_dice(item) {\n      var result_vectors = $box.start_throw(function (vectors, notation, callback) {\n        document.querySelectorAll(\"[data-throw-btn]\").forEach(function (tag) {\n          tag.disabled = true;\n        });\n        // document.getElementById('throw').disabled = true;\n        diceTable.style.display = 'block';\n        diceTable.style.width = window.innerWidth - 1 + 'px';\n        diceTable.style.height = window.innerHeight - 1 + 'px';\n        $box.reinit(diceTable, {\n          w: 500,\n          h: 300\n        });\n        callback();\n      }, function (notation, result) {\n        document.querySelectorAll(\"[data-throw-btn]\").forEach(function (tag) {\n          tag.disabled = false;\n        });\n        // document.getElementById('throw').disabled = false;\n        self.result = result.join(' ');\n        diceTable.style.display = 'none';\n      }, item.vec);\n    }\n  }\n});\nvar vm = app.mount('#app');\n\n//# sourceURL=webpack://SITE/./src/assets/js/includes/_diceRoll.js?");

/***/ }),

/***/ "./src/assets/js/includes/_keyboard_control.js":
/*!*****************************************************!*\
  !*** ./src/assets/js/includes/_keyboard_control.js ***!
  \*****************************************************/
/***/ (function() {

eval("\n\n//# sourceURL=webpack://SITE/./src/assets/js/includes/_keyboard_control.js?");

/***/ }),

/***/ "./src/assets/js/includes/_rolling_sample.js":
/*!***************************************************!*\
  !*** ./src/assets/js/includes/_rolling_sample.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ \"./node_modules/core-js/modules/web.dom-collections.for-each.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1__);\n\n\nfunction resetPopup() {\n  document.querySelectorAll(\"[data-roll]\").forEach(function (el) {\n    el.classList.remove(\"active\");\n  });\n  document.querySelector(\"[data-player-pic]\").setAttribute('data-player-pic', 'normal');\n  document.querySelector(\"[data-enemy-pic]\").setAttribute('data-enemy-pic', 'normal');\n  document.querySelector(\".test-difficulty\").classList.remove(\"active\");\n  document.querySelector(\".enemy-wrapper\").classList.remove(\"active\");\n  document.querySelector(\".test-saving\").classList.remove(\"active\");\n  document.querySelector(\".test-armor\").classList.remove(\"active\");\n  document.querySelector(\".test-result .result-value\").innerHTML = '';\n  document.querySelectorAll(\"[data-throw-result]\").forEach(function (el) {\n    el.innerHTML = '';\n  });\n  document.querySelector(\".test-result\").classList.remove(\"active\");\n  document.querySelectorAll(\".test-result .result\").forEach(function (el) {\n    el.classList.remove(\"active\");\n  });\n}\ndocument.querySelectorAll(\"[data-close-popup]\").forEach(function (buttonClosePopup) {\n  buttonClosePopup.addEventListener('click', function (btn) {\n    console.log('close popup');\n    document.querySelector(\".popup-overlay\").classList.remove(\"active\");\n    document.querySelector(\".popup-test\").classList.remove(\"active\");\n    resetPopup();\n  });\n});\nvar openPopup = document.querySelectorAll(\"[data-popup-roll]\").forEach(function (buttonPopup) {\n  buttonPopup.addEventListener('click', function (btn) {\n    var rollType = this.getAttribute(\"data-popup-roll\");\n    document.querySelector(\".popup-overlay\").classList.add(\"active\");\n    document.querySelector(\".popup-test\").classList.add(\"active\");\n    resetPopup();\n    document.querySelectorAll(\"[data-roll=\" + rollType + \"]\").forEach(function (el) {\n      el.classList.add(\"active\");\n    });\n    switch (rollType) {\n      case \"perception\":\n        document.querySelector(\"[data-roll=d20]\").classList.add(\"active\");\n        break;\n      case \"survival\":\n        document.querySelector(\"[data-roll=d20]\").classList.add(\"active\");\n        document.querySelector(\".test-difficulty\").classList.add(\"active\");\n        break;\n      case \"stealth\":\n        document.querySelector(\"[data-roll=d20]\").classList.add(\"active\");\n        document.querySelector(\".enemy-wrapper\").classList.add(\"active\");\n        document.querySelector(\".test-saving\").classList.add(\"active\");\n        break;\n      case \"attack\":\n        document.querySelector(\"[data-roll=d20]\").classList.add(\"active\");\n        document.querySelector(\".enemy-wrapper\").classList.add(\"active\");\n        document.querySelector(\".test-armor\").classList.add(\"active\");\n        break;\n      case \"damage\":\n        document.querySelector(\"[data-roll=d8]\").classList.add(\"active\");\n        break;\n    }\n    ;\n  });\n});\n\n//# sourceURL=webpack://SITE/./src/assets/js/includes/_rolling_sample.js?");

/***/ }),

/***/ "./src/assets/js/includes/_swiperInit.js":
/*!***********************************************!*\
  !*** ./src/assets/js/includes/_swiperInit.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each.js */ \"./node_modules/core-js/modules/web.dom-collections.for-each.js\");\n/* harmony import */ var core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var swiper_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! swiper/bundle */ \"./node_modules/swiper/swiper-bundle.esm.js\");\n\n\n\nvar slideActive, animateInk;\nvar swiper = new swiper_bundle__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\".mainSwiper\", {\n  loop: false,\n  effect: 'fade',\n  allowTouchMove: false,\n  fadeEffect: {\n    crossFade: true\n  },\n  pagination: {\n    el: \".swiper-pagination\",\n    type: \"fraction\"\n  },\n  navigation: {\n    nextEl: \".swiper-button-next\",\n    prevEl: \".swiper-button-prev\"\n  }\n  // keyboard: {\n  //   enabled: true,\n  // },\n});\n\nfunction checkForScenes(sceneStep) {\n  var hasScene = false;\n  var activeSlide = document.querySelector(\".swiper-slide-active\");\n  activeSlide.querySelectorAll(\"[data-scene-step]\").forEach(function (elemStep) {\n    if (elemStep.getAttribute('data-scene-step') == sceneStep) {\n      elemStep.classList.add('show');\n      hasScene = true;\n    }\n  });\n  return hasScene;\n}\nvar sctiveSceneStep = 1;\n\n// ###########################################################################################################################\n// TIMELINE\n// ###########################################################################################################################\n\nvar swiperTimeline = new swiper_bundle__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\".timelineSwiper\", {\n  loop: false,\n  allowTouchMove: false,\n  pagination: {\n    el: '.swiper-pagination',\n    type: 'bullets'\n  }\n});\n\n// ###########################################################################################################################\n// ELETRONIC RPGs\n// ###########################################################################################################################\n\nvar eletronicRPGsSwiper = new swiper_bundle__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\".eletronicRPGsSwiper\", {\n  loop: false,\n  effect: 'fade',\n  allowTouchMove: false,\n  fadeEffect: {\n    crossFade: true\n  }\n});\ndocument.querySelectorAll(\"[data-goto-slide]\").forEach(function (buttonGoToSlide) {\n  buttonGoToSlide.addEventListener('click', function (el) {\n    var slideNumber = buttonGoToSlide.getAttribute('data-goto-slide');\n    eletronicRPGsSwiper.slideTo(slideNumber, 0);\n  });\n});\n\n// ###########################################################################################################################\n// D&D TIMELINE\n// ###########################################################################################################################\n\nvar dndTimelineSwiper = new swiper_bundle__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\".dndTimelineSwiper\", {\n  loop: false,\n  effect: 'fade',\n  allowTouchMove: false,\n  fadeEffect: {\n    crossFade: true\n  }\n});\ndocument.querySelectorAll(\"[data-dnd-slide]\").forEach(function (buttonDndSlide) {\n  buttonDndSlide.addEventListener('click', function (el) {\n    var slideNumber = buttonDndSlide.getAttribute('data-dnd-slide');\n    dndTimelineSwiper.slideTo(slideNumber, 0);\n  });\n});\n\n// ###########################################################################################################################\n// FOUR CARDS\n// ###########################################################################################################################\n\nvar swiper4cards = new swiper_bundle__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\".slide4cardsSwiper\", {\n  loop: false,\n  direction: 'vertical',\n  allowTouchMove: false\n  // pagination: {\n  //   el: \".swiper-pagination\",\n  //   type: \"fraction\",\n  // },\n});\n\ndocument.querySelectorAll(\"[data-four-card]\").forEach(function (card) {\n  card.addEventListener(\"click\", function () {\n    if (card.classList.contains(\"active\")) {\n      card.classList.remove(\"active\");\n      document.querySelectorAll(\"[data-four-card]\").forEach(function (e) {\n        e.classList.remove(\"disabled\");\n      });\n    } else {\n      card.classList.add(\"active\");\n      document.querySelectorAll(\"[data-four-card]\").forEach(function (e) {\n        if (card != e) {\n          e.classList.add(\"disabled\");\n        }\n      });\n    }\n  });\n});\nfunction removeAnimationState() {\n  document.querySelectorAll(\".activated-by-key.swiper-slide-active\").forEach(function (slideActive) {\n    slideActive.querySelectorAll(\".inkmask-container\").forEach(function (el) {\n      el.classList.remove(\"animate\");\n    });\n    slideActive.classList.remove(\"animate-slide\");\n  });\n}\ndocument.onkeydown = function (e) {\n  e = e || window.event;\n  switch (e.key) {\n    case '.':\n      //MAIN SLIDE NEXT\n      removeAnimationState();\n      swiper.slideNext();\n      break;\n    case ',':\n      //MAIN SLIDE PREV\n      removeAnimationState();\n      swiper.slidePrev();\n      break;\n    case '[':\n      //SUBSLIDE PREV\n      removeAnimationState();\n      swiper4cards.slidePrev();\n      break;\n    case ']':\n      //SUBSLIDE NEXT\n      removeAnimationState();\n      swiper4cards.slideNext();\n      break;\n    case \"a\":\n      //ANIMATE\n      document.querySelectorAll(\".activated-by-key.swiper-slide-active\").forEach(function (slideActive) {\n        slideActive.querySelectorAll(\".inkmask-container\").forEach(function (animateInk) {\n          animateInk.classList.add(\"animate\");\n        });\n        slideActive.classList.add(\"animate-slide\");\n      });\n      break;\n    case \"d\":\n      //PUPPET DAVE OPEN\n      document.querySelector(\"[data-puppet-dave]\").classList.add(\"mouth-openned\");\n      break;\n    case \"g\":\n      //PUPPET GARY OPEN\n      document.querySelector(\"[data-puppet-gary]\").classList.add(\"mouth-openned\");\n      break;\n    case \"b\":\n      console.log('e onkeydown');\n      break;\n    case \"c\":\n      console.log('r onkeydown');\n      break;\n  }\n};\ndocument.onkeyup = function (e) {\n  e = e || window.event;\n  switch (e.key) {\n    case \"d\":\n      //PUPPET DAVE CLOSE\n      document.querySelector(\"[data-puppet-dave]\").classList.remove(\"mouth-openned\");\n      break;\n    case \"g\":\n      //PUPPET GARY CLOSE\n      document.querySelector(\"[data-puppet-gary]\").classList.remove(\"mouth-openned\");\n      break;\n    case \"b\":\n      console.log('e onkeyup');\n      break;\n    case \"c\":\n      console.log('r onkeyup');\n      break;\n  }\n};\n\n//# sourceURL=webpack://SITE/./src/assets/js/includes/_swiperInit.js?");

/***/ }),

/***/ "./src/assets/js/includes/fog.js":
/*!***************************************!*\
  !*** ./src/assets/js/includes/fog.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.to-string.js */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_0__);\n\nvar cam,\n  scene1,\n  scene2,\n  renderer1,\n  renderer2,\n  clock,\n  smokeMaterial,\n  h,\n  w,\n  requestID,\n  fogNumber,\n  slide1,\n  slide2,\n  smokeParticles = [];\nvar animate = function animate() {\n    var delta = clock.getDelta();\n    requestID = requestAnimationFrame(animate);\n    [].forEach.call(smokeParticles, function (sp) {\n      sp.rotation.z += delta * 0.2;\n    });\n    renderer1.render(scene1, cam);\n    renderer2.render(scene2, cam);\n  },\n  resize = function resize() {\n    renderer1.setSize(window.innerWidth, window.innerHeight);\n    renderer2.setSize(window.innerWidth, window.innerHeight);\n  },\n  lights = function lights() {\n    var light1 = new THREE.DirectionalLight(0xffffff, 0.5);\n    var light2 = new THREE.DirectionalLight(0xffffff, 0.5);\n    clock = new THREE.Clock();\n    renderer1 = new THREE.WebGLRenderer({\n      alpha: true\n    });\n    renderer2 = new THREE.WebGLRenderer({\n      alpha: true\n    });\n    // renderer.setClearColor(0x00547f, 0);\n    renderer1.setClearColor(0x000000, 1);\n    renderer1.setSize(w, h);\n    renderer2.setClearColor(0x000000, 0);\n    renderer2.setSize(w, h);\n    scene1 = new THREE.Scene();\n    scene2 = new THREE.Scene();\n    light1.position.set(-1, 0, 1);\n    light2.position.set(-1, 0, 1);\n    scene1.add(light1);\n    scene2.add(light2);\n  },\n  camera = function camera() {\n    cam = new THREE.PerspectiveCamera(75, w / h, 1, 10000);\n    cam.position.z = 1000;\n    scene1.add(cam);\n    scene2.add(cam);\n  },\n  action = function action(fogNumber) {\n    var loader = new THREE.TextureLoader();\n    loader.crossOrigin = '';\n    loader.load('./assets/images/blue-smoke.png', function onLoad(texture) {\n      var smokeGeo = new THREE.PlaneBufferGeometry(300, 300);\n      smokeMaterial = new THREE.MeshLambertMaterial({\n        map: texture,\n        transparent: true\n      });\n      for (var p = 0, l = fogNumber; p < l; p++) {\n        var particle1 = new THREE.Mesh(smokeGeo, smokeMaterial);\n        var particle2 = new THREE.Mesh(smokeGeo, smokeMaterial);\n        particle1.position.set(Math.random() * w - w / 2, Math.random() * 0 - 50, Math.random() * 300 + 700);\n        particle2.position.set(Math.random() * w - w / 2, Math.random() * 0 - 210, Math.random() * 300 + 700);\n        particle1.rotation.z = Math.random() * 360;\n        particle2.rotation.z = Math.random() * 360;\n        scene1.add(particle1);\n        scene2.add(particle2);\n        smokeParticles.push(particle1);\n        smokeParticles.push(particle2);\n      }\n      animate();\n    });\n  },\n  startAnimation = function startAnimation() {\n    console.log('startAnimation');\n    animate();\n  },\n  stopAnimation = function stopAnimation() {\n    console.log('cancelAnimationFrame');\n    cancelAnimationFrame(requestID);\n  },\n  playSound = function playSound() {\n    var audio = new Audio('https://audio.pronouncekiwi.com/Maxim/%D1%80%D1%83%D1%87%D0%BD%D0%BE%D0%B9%20%D0%BF%D1%80%D0%BE%D1%82%D0%B8%D0%B2%D0%BE%D1%82%D0%B0%D0%BD%D0%BA%D0%BE%D0%B2%D1%8B%D0%B9%20%D0%B3%D1%80%D0%B0%D0%BD%D0%B0%D1%82%D0%BE%D0%BC%D1%91%D1%82');\n    audio.play();\n  },\n  openMenuDice = function openMenuDice() {\n    document.getElementById('dicesWrapper').classList.toggle('active');\n  },\n  init = function init() {\n    h = window.innerHeight;\n    w = window.innerWidth;\n    lights(); //💡\n    camera(); // 🎥\n    action(100); // 🎬\n\n    slide1 = document.querySelector('[data-scene-step=\"back\"]');\n    slide1.appendChild(renderer1.domElement);\n    slide2 = document.querySelector('[data-scene-step=\"over\"]');\n    slide2.appendChild(renderer2.domElement);\n    // document.body.appendChild(renderer.domElement);\n    window.addEventListener('resize', resize);\n    document.getElementById('stopAnimation').addEventListener('click', stopAnimation);\n    document.getElementById('startAnimation').addEventListener('click', startAnimation);\n    document.getElementById('playSound').addEventListener('click', playSound);\n    document.getElementById('diceMenuTg').addEventListener('click', openMenuDice);\n  };\ninit();\n\n//# sourceURL=webpack://SITE/./src/assets/js/includes/fog.js?");

/***/ }),

/***/ "./src/assets/js/index.js":
/*!********************************!*\
  !*** ./src/assets/js/index.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/index.scss */ \"./src/assets/css/index.scss\");\n/* harmony import */ var _layout_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_layout.js */ \"./src/assets/js/_layout.js\");\n/* harmony import */ var _layout_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_layout_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _header_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_header.js */ \"./src/assets/js/_header.js\");\n/* harmony import */ var _header_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_header_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _includes_diceRoll_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./includes/_diceRoll.js */ \"./src/assets/js/includes/_diceRoll.js\");\n/* harmony import */ var _includes_swiperInit_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./includes/_swiperInit.js */ \"./src/assets/js/includes/_swiperInit.js\");\n/* harmony import */ var _includes_keyboard_control_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./includes/_keyboard_control.js */ \"./src/assets/js/includes/_keyboard_control.js\");\n/* harmony import */ var _includes_keyboard_control_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_includes_keyboard_control_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _includes_rolling_sample_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./includes/_rolling_sample.js */ \"./src/assets/js/includes/_rolling_sample.js\");\n/* harmony import */ var _includes_fog_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./includes/fog.js */ \"./src/assets/js/includes/fog.js\");\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://SITE/./src/assets/js/index.js?");

/***/ }),

/***/ "./src/assets/css/index.scss":
/*!***********************************!*\
  !*** ./src/assets/css/index.scss ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://SITE/./src/assets/css/index.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkSITE"] = self["webpackChunkSITE"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], function() { return __webpack_require__("./src/assets/js/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	SITE = __webpack_exports__;
/******/ 	
/******/ })()
;