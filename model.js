"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedNextId = seedNextId;
exports.advanceTask = advanceTask;
exports.deleteTask = deleteTask;
var nextId = 1;
function seedNextId(tasks) {
    nextId = tasks.reduce(function (max, t) { return Math.max(max, t.id); }, 0) + 1;
}
// Add a new task — always starts as "todo".
function addTask(tasks, title) {
    var newTask = { id: nextId++, title: title, status: "todo" };
    return __spreadArray(__spreadArray([], tasks, true), [newTask], false);
}
function advanceTask(tasks, id) {
    var next = {
        todo: "in-progress",
        "in-progress": "done",
        done: "done",
    };
    return tasks.map(function (t) { return (t.id === id ? __assign(__assign({}, t), { status: next[t.status] }) : t); });
}
// Mark a task done by id.
function completeTask(tasks, id) {
    return tasks.map(function (t) { return (t.id === id ? __assign(__assign({}, t), { status: "done" }) : t); });
}
function deleteTask(tasks, id) {
    return tasks.filter(function (t) { return t.id !== id; });
}
// Return only the tasks matching a given status.
function filterByStatus(tasks, status) {
    return tasks.filter(function (t) { return t.status === status; });
}
