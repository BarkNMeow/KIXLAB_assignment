"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var jsx_runtime_1 = require("react/jsx-runtime");
function List(props) {
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "list-content" }, { children: props.value })));
}
var Board = /** @class */ (function (_super) {
    __extends(Board, _super);
    function Board(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            answers: [],
            distractors: []
        };
        return _this;
    }
    Board.prototype.componentDidMount = function () {
        var _this = this;
        fetch('http://kuiz.kixlab.org:8080/getOptions')
            .then(function (res) { return res.json(); })
            .then(function (result) {
            _this.setState({
                answers: result.answers,
                distractors: result.distractors
            });
        }, function (error) {
            console.log("Failed to fetch");
        });
    };
    Board.prototype.updateList = function (e) {
        var _this = this;
        e.preventDefault();
        var new_answers, new_distractors;
        var input = e.target.text.value;
        var isAnswer = (e.target.type.value == 0);
        if (input === '')
            return;
        fetch('http://kuiz.kixlab.org:8080/submitOption', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                optionLabel: input,
                isAnswer: isAnswer
            })
        }).then(function (res) { return res.json(); })
            .then(function (result) {
            if (!result.success) {
                alert('response was not successful!');
                return;
            }
            if (isAnswer) {
                new_answers = __spreadArray(__spreadArray([], _this.state.answers, true), [input], false);
                new_distractors = __spreadArray([], _this.state.distractors, true);
            }
            else {
                new_answers = __spreadArray([], _this.state.answers, true);
                new_distractors = __spreadArray(__spreadArray([], _this.state.distractors, true), [input], false);
            }
            _this.setState({
                answers: new_answers,
                distractors: new_distractors
            });
        }, function (error) {
            console.log("Failed to fetch");
        });
    };
    Board.prototype.render = function () {
        var _this = this;
        return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "list-scroll" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "list-wrapper" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "list-title" }, { children: "Answers" })), this.state.answers.map(function (v, i) { return ((0, jsx_runtime_1.jsx)(List, { value: v }, i)); })] })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "list-wrapper" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "list-title" }, { children: "Distractors" })), this.state.distractors.map(function (v, i) { return ((0, jsx_runtime_1.jsx)(List, { value: v }, i)); })] }))] })), (0, jsx_runtime_1.jsxs)("form", __assign({ className: "list-insert", onSubmit: function (e) { return _this.updateList(e); } }, { children: [(0, jsx_runtime_1.jsx)("div", { children: "Create a New Option" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("input", { placeholder: "Type to create option...", name: "text" }) }), (0, jsx_runtime_1.jsxs)("label", { children: ["Answer", (0, jsx_runtime_1.jsx)("input", { type: "radio", name: "type", id: "answer", value: "0", defaultChecked: "checked" })] }), (0, jsx_runtime_1.jsxs)("label", { children: ["Distractors", (0, jsx_runtime_1.jsx)("input", { type: "radio", name: "type", id: "distractors", value: "1" })] })] }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("button", { children: "Submit" }) })] }))] }));
    };
    return Board;
}(React.Component));
// ========================================
var root = ReactDOM.createRoot(document.getElementById("root"));
root.render((0, jsx_runtime_1.jsx)(Board, {}));
