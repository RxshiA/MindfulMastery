import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';

const Pomodoro = () => {
  const initialTime = 25 * 60; // 25 minutes in seconds
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const startTimer = () => {
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timerRef.current);
          setIsRunning(false);
          showNotification('Pomodoro Complete', 'Time to take a break!');
          return initialTime;
        }
      });
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTime(initialTime);
  };

  const handleBreakTime = () => {
    // Set break time to 5 minutes
    setTime(5 * 60);
    startTimer();
  };

  useEffect(() => {
    // Clear the timer when the component is unmounted
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  const showNotification = (title, message) => {
    PushNotification.localNotification({
      channelId: 'default-channel-id',
      title,
      message,
    });
  };

  return (
    <View className='flex-1 justify-center items-center p-4'>
      <Text className='text-2xl font-bold mb-4'>{formatTime(time)}</Text>

      <View className='flex-row'>
        <TouchableOpacity onPress={isRunning ? stopTimer : startTimer} className='bg-blue-500 p-3 rounded m-2'>
          <Text className='text-white'>{isRunning ? 'Stop' : 'Start'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleBreakTime} className='bg-green-500 p-3 rounded m-2'>
          <Text className='text-white'>Break Time</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
};

export default Pomodoro;