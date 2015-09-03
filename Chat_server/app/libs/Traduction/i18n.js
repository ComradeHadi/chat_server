/**
 * loaded from session storage if defined
 * or it will be fr by default
 */

(function() {

	var i18n = i18n || {}; // init i18n

	i18n = {

		locales : [ 'fr', 'en' ],
		currentLocal : localStorage.getItem("currentLocal") || 'fr', 
		
		/**
		 * definition of messages
		 */
		labels : {
			// General
			"fr" : {
				fr : "français",
				en : "anglais"
			},
			"en" : {
				fr : "french",
				en : "english"
			},
            "username" : {
                fr : "pseudo",
                en : "username"
            },

            "passwords are not the same" : {
                fr : "les mots de passe ne sont pas identiques",
                en : "passwords are not the same"
            },
            "E-mail is not Valid" : {
                fr : "Votre E-mail n'est pas valide",
                en : "E-mail is not Valid"
            }

			
			// Authentication Module
			
			// Appointments Module
			
		},

		/**
		 * translate function
		 */
		t : function(stringToTranslate) {
			if (typeof this.labels[stringToTranslate] != "undefined"	|| typeof this.labels[stringToTranslate][this.currentLocal] != "undefined") 
				stringToTranslate = this.labels[stringToTranslate][this.currentLocal];
			else 
				console.log('missing translation for: "'+ stringToTranslate +'"');
				
			return stringToTranslate ;
		},

		/**
		 * change the language
		 */
		setLocal : function(language) {
			this.currentLocal = language;
			localStorage.setItem("currentLocal", language);

			if (language == 'ar')
				$('body').addClass('rtl');
			else
				$('body').removeClass('rtl');
		}
	};

	this.i18n = i18n;

}).call(this);