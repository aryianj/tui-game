import 'dotenv/config';
import React, { useEffect, useState } from 'react';
import { render, Text, Box } from 'ink';
import SelectInput from 'ink-select-input';

export default function App()  {
  const [scene, setScene] = useState('header');
  const [moonShape, setMoonShape] = useState('Full Moon')
  const apiKey = process.env.WEATHER_API_KEY;
  const city = encodeURIComponent('Cleveland, Ohio');

  useEffect(() => {
	const fetchData = async () => {
		try {
			const currentDate = new Date().toISOString()
			const date = currentDate.split('T')[0]
			const resp = await fetch(`http://api.weatherapi.com/v1/astronomy.json?key=${apiKey}&q=${city}&dt=${date}`)
			if (!resp.ok) throw new Error(`Response status: ${resp.status}`)
			const json = await resp.json()
			setMoonShape(json.astronomy.astro.moon_phase) 
		} catch (err) {
			console.error(`Fetching error: ${err}`)
		}
	};
	fetchData();
  }, [])

  const story = {
	header: {
		text: 'A text-based space adventure!',
		options: [
			{label: 'Start', value: 'start'},
			{label: 'Exit', value: 'end'}
		]

	},
    start: {
      text: `You awake inside a spaceship. Tonight, the moon is a ${moonShape}.`,
      options: [
        { label: 'Analyze the moon', value: 'analyze' },
        { label: 'Try to remember', value: 'remember' },
        { label: 'Yell for help', value: 'yell' }
      ]
    },
    analyze: {
      text: `After looking closely, you realize the moon is not a ${moonShape}. There is actually an alien devouring it! `,
      options: [
        { label: 'Look for weapons', value: 'weapons' },
        { label: 'Scream in fear', value: 'yell' },
		{ label: 'Pass out', value: 'sleepEnd'}
      ]
    },
    remember: {
      text: "You try to remember how you got here. You remember.. being dared to break into NASA and launch a spaceship...",
      options: [
        { label: 'Analyze the moon', value: 'analyze' },
		{ label: 'Smack your head out of stupidity', value: 'smack' },
		{ label: 'Try to escape', value: 'escapeLose'}
      ]
    },
	weapons: {
      text: "There are a bunch of buttons on the dashboard. Theres a big red button with a skull on it.",
      options: [
        { label: 'Press that button!', value: 'buttonLose' },
		{ label: 'Look around for a manual', value: 'search' },
		{ label: 'Press all the buttons (except the big red one)', value: 'winLose' },
      ]
    },
	yell: {
      text: "Your voice echoes throughout the spacecraft. No one comes. You're all alone.",
      options: [
        { label: 'Wait in silence', value: 'lose' },
		{ label: 'Look for weapons', value: 'weapons' },
		{ label: 'Pass out', value: 'sleep'}
      ]
    },
	sleepEnd: {
      text: "While you were passed out, the alien broke into your ship. It considered doing some evil alien activities but realized you looked quite cute asleep. However, it couldn't let you ruin its evil plan and so it kidnapped you. You live a great life though!",
      options: [
        { label: 'The End!', value: 'end' }
      ]
    },
    smack: {
      text: "You smacked yourself so hard you passed out.",
      options: [
		{ label: 'Pass out', value: 'sleepEnd'}
      ]
    },
	escapeLose: {
		text: "You fool! Did you forget you were in space!! You float out into the atmosphere for all eternity",
		options: [
        	{ label: 'The End!', value: 'end' }
      	]
	},
	buttonLose: {
		text: "You imbecile! You blew up your own ship!",
		options: [
        	{ label: 'The End!', value: 'end' }
      	]
	},
	search: {
		text: "You found the manual",
		options: [
        	{ label: 'Flip through the pages and find the button for weapons', value: 'find' },
			{ label: 'Flip through the pages and find if you can get some music going on in here', value: 'music' },
        	{ label: 'Press that button!', value: 'buttonLose' },
      	]
	},
	find: {
		text: "You found the page and pressed the button and absolutely WRECKED that alien. It's actually quite sad. Oh well! The moon is saved",
		options: [
        	{ label: 'The End!', value: 'end' }
      	]
	},
	music: {
		text: "You found the page and found the radio! There are only two songs on it",
		options: [
        	{ label: "Play 'Don't Stop The Music' by Rihanna ", value: 'musicWin' },
			{ label: "Play 'Martin Luther' by Yuno Miles ", value: 'musicLose' },
      	]
	},
	musicLose: {
		text: "Why did you think that would work? The alien stopped devouring the moon, but only because it needed to devour you first for playing that awful song",
		options: [
        	{ label: 'The End!', value: 'end' }
      	]
	},
	musicWin: {
		text: "Apparently aliens LOVE Rihanna. You spend the evening dancing with the alien until you're both sick of hearing the same song on repeat. The alien had so much fun he forgot he was consuming the moon and simply, went away",
		options: [
        	{ label: 'The End!', value: 'end' }
      	]
	},
	winLose: {
		text: "One of the buttons was a missle that successfully took out the alien! Yay! Unfortunately, one of the buttons was also an eject button. You float out into the atmosphere for all eternity",
		options: [
        	{ label: 'The End!', value: 'end' }
      	]
	},
	lose : {
		text: "You stood there too long and the alien devoured the moon and then came for you next.",
		options: [
        	{ label: 'The End!', value: 'end' }
      	]
	},
  };

  const handleSelect = (item) => {
    if (item.value === 'end') {
        process.exit(); // Closes the terminal app
    }
    setScene(item.value);
  };

  const current = story[scene];

  return (
    <Box flexDirection="column" padding={1} borderStyle="round" borderColor="cyan" height={30} width={80} justifyContent="center" alignItems="center">
      <Text color="yellow" bold>
        {scene == 'header' ? String.raw`
   _______ ___     ___ _______ ______  _______ 
  |   _   |   |   |   |   _   |   _  \|   _   |
  |.  1   |.  |   |.  |.  1___|.  |   |   1___|
  |.  _   |.  |___|.  |.  __)_|.  |   |____   |
  |:  |   |:  1   |:  |:  1   |:  |   |:  1   |
  |::.|:. |::.. . |::.|::.. . |::.|   |::.. . |
  \`--- ---\`-------\`---\`-------\`--- ---\`-------\'
` : String.raw`
.        .       * . Ojosh!ro '98
     +  /   .'\`-.  .         .        |
       /| .'\`-.  \`-.    .-""""-.   +  |
.  * / !'     \`-. /   /   0  . \     |
   . /\`/\`-.     / /   |     ( )  |    |
     \`/  _ \`-.-\` /   . \   . o  /     |
  ___Z__//   -  /\_____/\`-.__.-'  . * |
 /     //   -  /      /            .  |
 ~-._ //   -.-\`-./\`-,/  .  +          |
+  / ~ \`-.-'/    \`-./         * |
  '   '/   /   .      * .         * |
--------------------------------------+
	  `}
      </Text>
	  
	  <Box marginTop={1} marginBottom={1} flexDirection="column" >
        <Text color={scene === 'header' ? 'blue' : 'gray'} wrap="wrap">
          {current.text}
        </Text>
      </Box>      
      <SelectInput 
        items={current.options} 
        onSelect={handleSelect} 
        indicatorComponent={({isSelected}) => (
            <Text color="cyan">{isSelected ? ' > ' : '   '}</Text>
        )}
      />
    </Box>
  );
};

