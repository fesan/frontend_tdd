var assert      = require('chai').assert,
	sinon       = require('sinon'),
	Backbone    = require('backbone'),
	testContent = require('./content/testcontent.html'),

	Chat        = require('../../libs/Chat/view'),

	messageProvider = [
		'1',
		'it is a text',
		'it is another one',
		'Lorem ipsum dolor sit amet.',
		'40 characters Lorem ipsum dolor sit amet'
	];

suite('testing chat view', function() {
	setup(function() {
		Backbone.$('#sandbox').html(testContent);
		Chat.prototype.onSendClick = sinon.spy(Chat.prototype, 'onSendClick');
		this.chat = new Chat({el : '.chat'});
	});

	teardown(function() {
		Chat.prototype.onSendClick.restore();
	});

	messageProvider.forEach(function(msg) {
		test('test validation of "' + msg + '"', function() {
			assert.isTrue(this.chat.validateMessage(msg));
		});
	});

	test('test validation of 0 characters', function() {
		assert.isFalse(this.chat.validateMessage(''));
	});

	test('test validation of 41 characters', function() {
		var msg = new Array(42).join('a');
		assert.isFalse(this.chat.validateMessage(msg));
	});

	test('test send button click', function() {
		this.chat.$(this.chat.ui.sendBtn).trigger('click');
		assert.isTrue(this.chat.onSendClick.calledOnce);
	});

	test('test message sending', function() {
		var testmsg = 'it is a predefined input';
		this.chat.$(this.chat.ui.chatInput).val(testmsg);
		this.chat.$(this.chat.ui.sendBtn).trigger('click');
		assert.strictEqual(this.chat.$(this.chat.ui.messageBox).children('li').text(), testmsg);
	});

	test('test new message is the last', function() {
		var lastItem = messageProvider[messageProvider.length - 1];
		messageProvider.forEach(function(msg) {
			this.chat.$(this.chat.ui.chatInput).val(msg);
			this.chat.$(this.chat.ui.sendBtn).trigger('click');
		}, this);
		assert.strictEqual(this.chat.$(this.chat.ui.messageBox).children('li').last().text(), lastItem);
	});
});
