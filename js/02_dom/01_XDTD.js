var X_Dom_DTD_EMPTY = {
		'AREA'     : true,
		'BASE'     : true,
		'BASEFONT' : true,
		'BR'       : true,
		'COL'      : true,
		'FRAME'    : true,
		'HR'       : true,
		'IMG'      : true,
		'INPUT'    : true,
		'ISINDEX'  : true,
		'LINK'     : true,
		'META'     : true,
		'PARAM'    : true,
		'EMBED'    : true
	},
	
	/*
	 * TODO html5 要素, audio, video は?
	 */	
	X_Dom_DTD_TAG_FIX =
		( X_UA.Trident || X_UA.TridentMobile ) < 5 ? // IE4
			{ 'ABBR' : 'ACRONYM', 'BDO' : '', 'RUBY' : '' } :
		( X_UA.Trident || X_UA.TridentMobile ) < 7 ? // IE6-
			{ 'ABBR' : 'ACRONYM' } :
			{},
	
	X_Dom_DTD_ATTR_VAL_IS_URI = {
		'action'     : true,
		'archive'    : true,
		'background' : true,
		'cite'       : true,
		'classid'    : true,
		'codebase'   : true,
		'data'       : true,
		'href'       : true,
		'longdesc'   : true,
		'profile'    : true,
		'src'        : true, // lowsrc, dynsrc
		'usemap'     : true
	},
	
	X_Dom_DTD_MOVE_TO_HEAD = {
		'STYLE'   : true,
		'LINK'    : true,
		'TITLE'   : true,
		'BGSOUND' : true,
		'AREA'    : true,
		'BASE'    : true,
		'META'    : true
	},
	
	X_Dom_DTD_CLEANUP_TAGS = {
		'SCRIPT'   : true,
		'NOSCRIPT' : true,
		'NOFRAMES' : true,
		'!'        : true, // ie
		'COMMENT'  : true, // ie
		'NOEMBED'  : true,
		'NOLAYER'  : true
	},
	
	X_Dom_DTD_SKIP_CLEANUP_TAGS = {
		'PRE'       : true,
		'TEXTAREA'  : true,
		'CODE'      : true,
		'KBD'       : true,
		'SAMP'      : true,
		'XMP'       : true,
		'PLAINTEXT' : true,
		'LISTING'   : true
	};

