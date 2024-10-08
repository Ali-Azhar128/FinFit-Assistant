useCopilotAction({
    name: 'addSleepData',
    description: 'Adds a sleep data point to the chart',
    parameters: [
      {
        name: 'day',
        type: 'string',
        description: 'The day of the data point',
        required: true,
      },
      {
        name: 'sleep',
        type: 'number',
        description: 'The amount of sleep in hours',
        required: true,
      },
    ],
    handler: ({ day, sleep }) => {
      addSleepData(day, sleep);
    },
  });