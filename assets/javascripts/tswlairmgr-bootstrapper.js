var tswlairmgr = tswlairmgr || {};
tswlairmgr.bootstrapper = tswlairmgr.bootstrapper || {};

tswlairmgr.bootstrapper = function bootstrapper() {
	this.defaultLair = null;
	
	this._bootstrapPreloader = function() {
		tswlairmgr.preloaderInstance = new tswlairmgr.preloader.Preloader();
		
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.bootstrapper> Preloader initialized.');
		}
	};
	
	this._bootstrapBossFragmentsDisplay = function() {
		
		tswlairmgr.bossfragmentsInstance = new tswlairmgr.bossfragments.Bosses(
			document.getElementById('boss-fragments'),
			this.defaultLair
		);
		
		if(tswlairmgr.settings.demo)
		{
			this._demoSetRandomFragmentCounts();
		}
		
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.bootstrapper> Boss fragments display initialized.');
		}
	};
	
	this._bootstrapLairSelectorDropdown = function() {
		tswlairmgr.lairselectorInstance = new tswlairmgr.lairselector.LairSelectorDropdown(
			document.getElementById('lair-selector'),
			document.getElementsByTagName('body')[0],
			tswlairmgr.bossfragmentsInstance,
			tswlairmgr.settings['lair_default']['region_id'],
			tswlairmgr.settings['lair_default']['lair_id']
		);
		
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.bootstrapper> Lair selector dropdown initialized.');
		}
	};
	
	this._bootstrapTurninParticipants = function() {
		tswlairmgr.turninparticipantsInstance = new tswlairmgr.turnin.Participants(document.getElementById("participants"));
		
		if(tswlairmgr.settings.demo)
		{
			this._demoInsertRandomNames();
		}
		
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.bootstrapper> Turn-in: Participant list initialized.');
		}
	}
	
	this._demoSetRandomFragmentCounts = function() {
		for(var i=0; i<tswlairmgr.bossfragmentsInstance.bosses.length; i++)
		{
			var boss = tswlairmgr.bossfragmentsInstance.bosses[i];

			for(var j=0; j<boss.fragments.length; j++)
			{
				var fragment = boss.fragments[j];

				var randomFragmentCount = Math.floor(Math.random() * 10);
				fragment.controls.setCount( randomFragmentCount );
			}
		}
	};
	
	this._demoInsertRandomNames = function() {
		var names = [ /* Hi guys! */
			'Cobin',
			'dirtyLilFreak',
			'Dott',
			'Feidelm',
			'Jermaine',
			'Martlet',
			'Onee-san',
			'Paschendale',
			'Samiira',
			'Sugar-Daddy',
			'Taltala',
			'Wakko'
		];
		
		//+ Jonas Raoni Soares Silva
		//@ http://jsfromhell.com/array/shuffle [v1.0]
		names = (function shuffle(o){ //v1.0
		    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		    return o;
		})(names);
		
		for(var i=0; i<names.length; i++)
		{
			tswlairmgr.turninparticipantsInstance.addParticipant(names[i]);
		}
	}
	
	this.init = function() {
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.bootstrapper> init called');
		}
		
		var defaultLairSettings = tswlairmgr.settings.lair_default
		this.defaultLair = tswlairmgr.data.lairdata[defaultLairSettings.region_id].lairs[defaultLairSettings.lair_id];
		
		this._bootstrapPreloader();
		this._bootstrapBossFragmentsDisplay();
		this._bootstrapLairSelectorDropdown();
		this._bootstrapTurninParticipants();
		
		if(tswlairmgr.settings.debug)
		{
			console.log('<tswlairmgr.bootstrapper> Bootstrapping process complete, TSW Lair Manager is fully initialized.');
		}
	};
	
	this.init();
}