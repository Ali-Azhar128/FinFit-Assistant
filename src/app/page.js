'use client'
import { DietChart } from "@/components/dashboard/DietChart";
import { useCopilotReadable, useCopilotAction, useCopilotChat } from "@copilotkit/react-core";
import { CopilotPopup, useCopilotChatSuggestions } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { SleepChart } from "@/components/dashboard/SleepChart";
import FinancialLogs from "@/components/dashboard/FinanceLogs";
import { PieChart } from "lucide-react";
import { CaloriesGainedChart } from "@/components/dashboard/caloriesChart/CaloriesGained";

export default function Home() {
  const [chartData, setChartData] = useState([
    { time: '08:00', ate: 1 },
    { time: '09:00', ate: 0 },
    { time: '10:00', ate: 0 },
    { time: '11:00', ate: 1 },
    { time: '12:00', ate: 0 },
    { time: '13:00', ate: 0 },
  ]);

  const [heightChartData, setHeightChartData] = useState([
    { month: "January", height: 2 },
    { month: "February", height: 3 },
    { month: "March", height: 1.5 },
    { month: "April", height: 2.5 },
    { month: "May", height: 3 },
    { month: "June", height: 2 },
  ]);

  const [goals, setGoals] = useState([
  ]);

  const [sleepChartData, setSleepChartData] = useState([
    { day: "Monday", hours: 0 },
    { day: "Tuesday", hours: 0 },
    { day: "Wednesday", hours: 0 },
    { day: "Thursday", hours: 0 },
    { day: "Friday", hours: 0 },
    { day: "Saturday", hours: 0 },
    { day: "Sunday", hours: 0 },
  ]);

  const [caloriesChartData, setCaloriesChartData] = useState([
   
  ]);


  const [financeLogs, setFinanceLogs] = useState([
  ]);
  const [goalAmount, setGoalAmount] = useState(Infinity);

  const addData = (time, ate) => {
    setChartData([...chartData, { time, ate }]);
  };

  const deleteDietData = (time) => {
    setChartData(chartData.filter((data) => data.time !== time));
  };

  const addHeightData = (month, height) => {
    setHeightChartData([...heightChartData, { month, height }]);
  };

  const deleteHeightData = (month) => {
    setHeightChartData(heightChartData.filter((data) => data.month !== month));
  };

  const incrementHeightData = (month, increment) => {
    setHeightChartData(heightChartData.map((data) => 
      data.month === month ? { ...data, height: data.height + increment } : data
    ));
  };

  const addGoal = (goal) => {
    setGoals([...goals, goal]);
    console.log(goal)
  };

  const deleteGoal = (goal) => {
    setGoals(goals.filter((g) => g !== goal));
  };

  const addSleepData = (day, sleep) => {
    setSleepChartData([...sleepChartData, { day, sleep }]);
  };

  const updateSleepData = (day, hours) => {
    setSleepChartData(sleepChartData.map((data) => 
      data.day === day ? { ...data, hours } : data
    ));
  };

  const setSpendingGoal = (amount) => {
    console.log(amount, 'goalAmount')
    setGoalAmount(amount);
  };

  const addFinanceLog = (item, price) => {
    const totalSpent = financeLogs.reduce((sum, log) => sum + log.price, 0);
    if (totalSpent + price <= goalAmount) {
      setFinanceLogs([...financeLogs, { item, price }]);
    } else {
      alert("You have exceeded your spending goal!");
    const event = new CustomEvent('copilotkit:sendMessage', {
      detail: { message: "You have exceeded your spending goal!" }
    });
    window.dispatchEvent(event);
    }
  };

  const addCaloriesData = (food, calories) => {
    setCaloriesChartData([...caloriesChartData, { food, calories }]);
  };

  // useEffect(() => {
  //   appendMessage(
  //     new TextMessage({
  //       content: "Hello! Share your daily goals with me.",
  //       role: Role.Assistant,
  //     }),
  //   );
  // }, []);

  useCopilotAction({
    name: 'addData',
    description: 'Adds a data point to the chart',
    parameters: [
      {
        name: 'time',
        type: 'string',
        description: 'The time of the data point',
        required: true,
      },
      {
        name: 'ate',
        type: 'number',
        description: 'Whether the user ate (1 for ate, 0 for not ate)',
        required: true,
      },
    ],
    handler: ({ time, ate }) => {
      addData(time, ate);
    },
  });

  useCopilotAction({
    name: 'deleteDietData',
    description: 'Deletes a data point from the chart',
    parameters: [
      {
        name: 'time',
        type: 'string',
        description: 'The time of the data point to delete',
        required: true,
      },
    ],
    handler: ({ time }) => {
      deleteDietData(time);
    },
  });

  useCopilotReadable({
    description: 'The state of the chart data',
    value: JSON.stringify(chartData),
  });



  useCopilotAction({
    name: "addDietary",
    description: "Adds a dietary item to the list",
    parameters: [
      {
        name: "item",
        type: "string",
        description: "The dietary item to add",
        required: true,
      },
    ],
    handler: ({ item }) => {
      addDietary(item);
    },
  });

  useCopilotAction({
    name: 'addHeightData',
    description: 'Adds a height data point to the chart',
    parameters: [
      {
        name: 'month',
        type: 'string',
        description: 'The month of the data point',
        required: true,
      },
      {
        name: 'height',
        type: 'number',
        description: 'The height increase in cm',
        required: true,
      },
    ],
    handler: ({ month, height }) => {
      addHeightData(month, height);
    },
  });

  useCopilotAction({
    name: 'deleteHeightData',
    description: 'Deletes a height data point from the chart',
    parameters: [
      {
        name: 'month',
        type: 'string',
        description: 'The month of the data point to delete',
        required: true,
      },
    ],
    handler: ({ month }) => {
      deleteHeightData(month);
    },
  });

  useCopilotAction({
    name: 'incrementHeightData',
    description: 'Increments the height data for a specific month',
    parameters: [
      {
        name: 'month',
        type: 'string',
        description: 'The month of the data point to increment',
        required: true,
      },
      {
        name: 'increment',
        type: 'number',
        description: 'The amount to increment the height by',
        required: true,
      },
    ],
    handler: ({ month, increment }) => {
      incrementHeightData(month, increment);
    },
  });

  useCopilotAction({
    name: 'addGoal',
    description: 'Adds a personal goal',
    parameters: [
      {
        name: 'goal',
        type: 'string',
        description: 'The personal goal to add',
        required: true,
      },
    ],
    handler: ({ goal }) => {
      addGoal(goal);
    },
  });

  useCopilotAction({
    name: 'deleteGoal',
    description: 'Deletes a personal goal',
    parameters: [
      {
        name: 'goal',
        type: 'string',
        description: 'The personal goal to delete',
        required: true,
      },
    ],
    handler: ({ goal }) => {
      deleteGoal(goal);
    },
  });

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

  useCopilotAction({
    name: 'updateSleepData',
    description: 'Updates the sleep data for a specific day',
    parameters: [
      {
        name: 'day',
        type: 'string',
        description: 'The day of the data point to update',
        required: true,
      },
      {
        name: 'hours',
        type: 'number',
        description: 'The amount of sleep in hours',
        required: true,
      },
    ],
    handler: ({ day, hours }) => {
      updateSleepData(day, hours);
    },
  });

  useCopilotAction({
    name: 'addFinanceLog',
    description: 'Adds a finance log',
    parameters: [
      {
        name: 'item',
        type: 'string',
        description: 'The item bought',
        required: true,
      },
      {
        name: 'price',
        type: 'number',
        description: 'The price of the item',
        required: true,
      },
    ],
    handler: ({ item, price }) => {
      addFinanceLog(item, price);
    },
  });

  useCopilotAction({
    name: 'setSpendingGoal',
    description: 'Sets a spending goal for the day',
    parameters: [
      {
        name: 'amount',
        type: 'number',
        description: 'The spending goal amount',
        required: true,
      },
    ],
    handler: ({ amount }) => {
      setSpendingGoal(amount);
      addGoal(`Spend no more than $${amount}`);
    },
  });

  useCopilotAction({
    name: 'addCaloriesData',
    description: 'Adds a calories data point to the chart',
    parameters: [
      {
        name: 'food',
        type: 'string',
        description: 'The food of the data point',
        required: true,
      },
      {
        name: 'calories',
        type: 'number',
        description: 'The number of calories consumed',
        required: true,
      },
    ],
    handler: ({ food, calories }) => {
      setCaloriesChartData([...caloriesChartData, { food, calories }]);
    },
  });

  useCopilotAction({
  name: 'deleteCaloriesData',
  description: 'Deletes a calories data point from the chart',
  parameters: [
    {
      name: 'food',
      type: 'string',
      description: 'The time of the data point to delete',
      required: true,
    },
  ],
  handler: ({ food }) => {
    setCaloriesChartData(caloriesChartData.filter((data) => data.food !== food));
  },
});

  useCopilotReadable({
    description: 'The state of the height chart data',
    value: JSON.stringify(heightChartData),
  });

  useCopilotReadable({
    description: 'The state of the personal goals',
    value: JSON.stringify(goals),
  });

  useCopilotReadable({
    description: 'The state of the sleep chart data',
    value: JSON.stringify(sleepChartData),
  });

  useCopilotReadable({
    description: 'The state of the finance logs',
    value: JSON.stringify(financeLogs),
  });

  useCopilotReadable({
    description: 'The state of the goal amount',
    value: JSON.stringify(goalAmount),
  });

  useCopilotReadable({
    description: 'The state of the calories data',
    value: JSON.stringify(caloriesChartData),
  });

  useCopilotChatSuggestions({
    instructions: `Offer personalized suggestions for workouts, spending adjustments, personal goals, sleeping pattern and calories consumed and burnt based on user preferences:
      Goals: ${JSON.stringify(goals)},
      Spending Goal: ${goalAmount},
      Sleep Data: ${JSON.stringify(sleepChartData)},
      Calories Data: ${JSON.stringify(caloriesChartData)}`,
    minSuggestions: 1,
    maxSuggestions: 4,
  });

  return (
      <div className="flex">
      <Sidebar goals={goals}/>
       <div className=" w-[100%] ml-[20%] mainArea">
        <div className="h-[40%] w-[100%] flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            
            <SleepChart chartData={sleepChartData} />
     
            <FinancialLogs financeLogs={financeLogs} />
            <CaloriesGainedChart chartData={caloriesChartData} />
        
        
        </div>
       </div>
       <CopilotPopup
       defaultOpen={true}
  labels={{
    title: "Your Assistant",
    initial: "Hi! 👋 Share your daily goals with me",
  }}
/>
    
      
      </div>
 
  );
}