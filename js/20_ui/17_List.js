
X.UI.List = X.UI.ScrollBox.inherits(
	'Repeater',
	X_Class.NONE,
	{
		Constructor : function( dataSource, itemRenderer ){
			
			this.Super(
				{
					borderColor  : 0x252527,
					borderWidth  : [ 0.15, 0, 0 ],
					borderStyle  : 'solid',
					height       : 'auto',
					bgColor      : 0x444643,
					gapY         : 0.15,
					scrollSlider : X.UI.Repeater.apply( 0, [ dataSource, itemRenderer ] )
				}
			);
		}
	}
);
