"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _index = _interopRequireDefault(require("../express-swagger/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var router = (0, _express.Router)();
router.get("/", function _callee(req, res, next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_index["default"].read());

        case 3:
          if (_index["default"].data.length) {
            res.status(200).json(_index["default"].data);
          } else {
            res.status(200).json({
              message: "There are no todos."
            });
          }

          _context.next = 10;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.log("*** Get all todos");
          next(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
router.get("/:id", function _callee2(req, res, next) {
  var id, todo;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_index["default"].read());

        case 4:
          if (_index["default"].data.length) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: "There are no todos"
          }));

        case 6:
          todo = _index["default"].data.find(function (t) {
            return t.id === id;
          });

          if (todo) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: "There is no todo with provided ID"
          }));

        case 9:
          res.status(200).json(todo);
          _context2.next = 16;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](1);
          console.log("*** Get todo by ID");
          next(_context2.t0);

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 12]]);
});
router.post("/", function _callee3(req, res, next) {
  var text, newTodo;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          text = req.body.text;

          if (text) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            message: "New todo text must be provided"
          }));

        case 3:
          _context3.prev = 3;
          _context3.next = 6;
          return regeneratorRuntime.awrap(_index["default"].read());

        case 6:
          newTodo = {
            id: String(_index["default"].data.length + 1),
            text: text,
            done: false
          };

          _index["default"].data.push(newTodo);

          _context3.next = 10;
          return regeneratorRuntime.awrap(_index["default"].write());

        case 10:
          res.status(201).json(_index["default"].data);
          _context3.next = 17;
          break;

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](3);
          console.log("*** Create todo");
          next(_context3.t0);

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[3, 13]]);
});
router.put("/:id", function _callee4(req, res, next) {
  var id, changes, todo, updatedTodo, newTodos;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;

          if (id) {
            _context4.next = 3;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            message: "Existing todo ID must be provided"
          }));

        case 3:
          changes = req.body.changes;

          if (changes) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            message: "Changes must be provided"
          }));

        case 6:
          _context4.prev = 6;
          _context4.next = 9;
          return regeneratorRuntime.awrap(_index["default"].read());

        case 9:
          todo = _index["default"].data.find(function (t) {
            return t.id === id;
          });

          if (todo) {
            _context4.next = 12;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            message: "There is no todo with provided ID"
          }));

        case 12:
          updatedTodo = _objectSpread({}, todo, {}, changes);
          newTodos = _index["default"].data.map(function (t) {
            return t.id === id ? updatedTodo : t;
          });
          _index["default"].data = newTodos;
          _context4.next = 17;
          return regeneratorRuntime.awrap(_index["default"].write());

        case 17:
          res.status(201).json(_index["default"].data);
          _context4.next = 24;
          break;

        case 20:
          _context4.prev = 20;
          _context4.t0 = _context4["catch"](6);
          console.log("*** Update todo");
          next(_context4.t0);

        case 24:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[6, 20]]);
});
router["delete"]("/:id", function _callee5(req, res, next) {
  var id, todo, newTodos;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;

          if (id) {
            _context5.next = 3;
            break;
          }

          return _context5.abrupt("return", res.status(400).json({
            message: "Existing todo ID must be provided"
          }));

        case 3:
          _context5.prev = 3;
          _context5.next = 6;
          return regeneratorRuntime.awrap(_index["default"].read());

        case 6:
          todo = _index["default"].data.find(function (t) {
            return t.id === id;
          });

          if (todo) {
            _context5.next = 9;
            break;
          }

          return _context5.abrupt("return", res.status(400).json({
            message: "There is no todo with provided ID"
          }));

        case 9:
          newTodos = _index["default"].data.filter(function (t) {
            return t.id !== id;
          });
          _index["default"].data = newTodos;
          _context5.next = 13;
          return regeneratorRuntime.awrap(_index["default"].write());

        case 13:
          res.status(201).json(_index["default"].data);
          _context5.next = 20;
          break;

        case 16:
          _context5.prev = 16;
          _context5.t0 = _context5["catch"](3);
          console.log("*** Remove todo");
          next(_context5.t0);

        case 20:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[3, 16]]);
});
var _default = router;
exports["default"] = _default;