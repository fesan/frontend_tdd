/**
 * @module views/Chat
 */

var Backbone = require('backbone'),

	/**
	* @class
	* @extends external:Backbone.Marionette.View
	*/
	Chat = Backbone.Marionette.View.extend(
	/** @lends module:views/Chat~Chat.prototype */
	{
		ui : {
			messageBox : '.chat-messages',
			chatInput  : '.chat-input',
			sendBtn    : '.chat-btn-send'
		},

		events : {
			'click @ui.sendBtn' : 'onSendClick'
		},

		/**
		 * If the given message is valid, shows the message in the box (the clears the input).
		 *
		 * @return void
		 */
		onSendClick : function() {
			var input = this.$(this.ui.chatInput),
				msg   = input.val();
			if (this.validateMessage(msg)) {
				this.sendMessage(msg);
				input.val('');
			}
		},

		/**
		 * Validates the given message and returns true if it meets the requirements.
		 *
		 * @param {String} msg      The string what has to be validated.
		 * @returns {Boolean}
		 */
		validateMessage : function(msg) {
			return (typeof msg === 'string' && msg.length > 0 && msg.length <= 40);
		},

		/**
		 * Appends the give message to the to message box.
		 *
		 * @param {String} msg      The string what has to be appended to the message box.
		 */
		sendMessage : function(msg) {
			this.$(this.ui.messageBox).append('<li>' + msg + '</li>');
		}
	}
);

module.exports = Chat;
