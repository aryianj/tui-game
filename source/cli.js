#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './app.js';

const cli = meow(
	`
		Usage
		  $ tui-game

		Options
			--name  Your name

		Examples
		  $ tui-game --name=Jane
		  Hello, Jane
	`,
	{
		importMeta: import.meta,
	},
);

render(<App name={cli.flags.name} />);
