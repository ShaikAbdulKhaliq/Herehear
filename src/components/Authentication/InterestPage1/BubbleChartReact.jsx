import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import d3Tip from "d3-tip";
import _ from "lodash";
import "./BubbleChartReact.css";
import { useGlobalInfo } from "../../../context/globalContext";
import { updateEventCategories } from "../../../API/useApi";

const BubbleChartReact = ({ onTotalClicksChange, isResetClicked }) => {
  const context = useGlobalInfo();
  const { usersData, events, setFilteredEvents, setIsReturningUser, allEventCategories } = useGlobalInfo();
  console.log(allEventCategories, 'allEventCategories');
  const maxClicks = 5;
  const incrementValue = 1;
  const chartRef = useRef();

  let lang = localStorage.getItem("i18nextLng") || "en";
  lang = lang.length === 2 ? lang : "en";

  const [countclicks, setCountclicks] = useState(0);
  const [childrenArray, setChildrenArray] = useState([]);

  useEffect(() => {
    if (allEventCategories[lang]) {
      setChildrenArray(
        allEventCategories[lang].map((category) => ({
          name: category.name,
          value: category.value,
          clicks: 0,
        })).map((bubble) => ({
          ...bubble,
          value: bubble.value + bubble.clicks * incrementValue,
        }))
      );
    }
  }, [allEventCategories, lang]);

  useEffect(() => {
    if (allEventCategories[lang]) {
      setChildrenArray(
        allEventCategories[lang].map((category) => ({
          name: category.name,
          value: category.value,
          clicks: 0,
        })).map((bubble) => ({
          ...bubble,
          value: bubble.value + bubble.clicks * incrementValue,
        }))
      );
    }
  }, [allEventCategories, lang]);
  

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = localStorage.getItem("confirmedPhoneNumber");
      const userExist = usersData[lang]?.find(
        (user) => user.mobileNumber === currentUser
      );
      if (userExist && userExist?.category) {
        const updatedChildrenArray = childrenArray.map((child) => {
          if (userExist?.category.includes(child.name)) {
            const newClicks = maxClicks;
            return { ...child, clicks: newClicks, value: child.value + incrementValue };
          }
          return child;
        });
        setChildrenArray(updatedChildrenArray);
        setCountclicks(userExist.category.length * maxClicks);
        setIsReturningUser(true);
      }
    };
    fetchUserData();
  }, []);

  const triggerIncrease = (obj) => {
    navigator.vibrate(75);
    setChildrenArray((prevArray) =>
      prevArray.map((i) => {
        if (i.name === obj.name && i.clicks < maxClicks) {
          const newClicks = i.clicks + 1;
          return { ...i, value: i.value + incrementValue, clicks: newClicks };
        }
        return i;
      })
    );
  };

  useEffect(() => {
    onTotalClicksChange(countclicks);
  }, [countclicks, onTotalClicksChange]);

  useEffect(() => {
    renderChart();
  }, [childrenArray]);

  useEffect(() => {
    const checkBubblesClicked = async () => {
      const clickedBubbles = childrenArray.filter(
        (child) => child.clicks === maxClicks
      );
      if (clickedBubbles.length >= 5) {
        const selectedCategories = clickedBubbles.map((bubble) => bubble.name);
        
        const selectedEvents = events[lang].filter(event => selectedCategories.includes(event.eventCategory));
        setFilteredEvents(selectedEvents);
        const currentUser = localStorage.getItem("confirmedPhoneNumber");
        try {
          const userExist = usersData[lang]?.find(
            (user) => user.mobileNumber === currentUser
          );
          const userIndex = usersData[lang].findIndex(
            (user) => user.mobileNumber === currentUser
          );

          if (userExist) {
            const updatedUser = { ...userExist, category: selectedCategories };
            usersData[lang][userIndex] = updatedUser;
            localStorage.setItem("userDetails", JSON.stringify(updatedUser));
          } else {
            const uniqueId = `${Math.random().toString(36).substring(2, 6)}`;
            const newUser = {
              id: uniqueId,
              mobileNumber: currentUser,
              fullname: context.userDetails.fullname,
              city: context.userDetails.city,
              duration: context.userDetails.duration,
              purpose: context.userDetails.purpose,
              numberOfGuests: context.userDetails.numberOfGuests,
              category: selectedCategories,
            };
            usersData[lang].push(newUser);
            localStorage.setItem("userDetails", JSON.stringify(newUser));
          }
          await updateEventCategories(usersData);
        } catch (error) {
          console.error("Error updating/creating user:", error);
        }
      }
    };

    checkBubblesClicked();
  }, [childrenArray]);

  const wrapText = (text, radius) => {
    text.each(function () {
      const text = d3.select(this);
      const words = text.text().split(/\s+/).reverse();
      let word;
      let line = [];
      let lineNumber = 0;
      const lineHeight = 1.1; // ems
      const y = text.attr("y");
      const dy = parseFloat(text.attr("dy"));
      let tspan = text
        .text(null)
        .append("tspan")
        .attr("x", 0)
        .attr("y", y)
        .attr("dy", dy + "em");

      while ((word = words.pop())) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > 2 * radius) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text
            .append("tspan")
            .attr("x", 0)
            .attr("y", y)
            .attr("dy", ++lineNumber * lineHeight + dy + "em")
            .text(word);
        }
      }
    });
  };

  const handleMouseDown = async (d) => {
    d.pressTimer = setTimeout(async () => {
      const currentUser = localStorage.getItem("confirmedPhoneNumber");
      const userExist = usersData[lang]?.find(
        (user) => user.mobileNumber === currentUser
      );
      if (userExist && userExist.category) {
        const updatedCategories = userExist.category.filter(category => category !== d.name);
        const updatedUser = { ...userExist, category: updatedCategories };
        const userIndex = usersData[lang].findIndex(
          (user) => user.mobileNumber === currentUser
        );
        usersData[lang][userIndex] = updatedUser;
        localStorage.setItem("userDetails", JSON.stringify(updatedUser));
        await updateEventCategories(usersData);
      }
  
      setChildrenArray((prevArray) =>
        prevArray.filter((i) => i.name !== d.name)
      );
      
    }, 1000); 
  };
  

  const handleMouseUp = (d) => {
    clearTimeout(d.pressTimer);
  };

  const renderChart = () => {

    if (!childrenArray || childrenArray.length === 0) {
      return;
    }

    const json = {
      children: childrenArray.filter((bubble) => bubble.name !== ""),
    };

    d3.select(chartRef.current).selectAll("*").remove();

    const diameter = 600;

    const bubble = d3.pack().size([diameter, diameter]).padding(1.5);

    const tip = d3Tip()
      .attr("class", "d3-tip-outer")
      .offset([-38, 0])
      .html((event, d) => {
        const item = d.data;
        return `<div class="d3-tip" style="background-color: grey">${item.name} (${item.value})</div><div class="d3-stem" style="border-color: grey transparent transparent transparent"></div>`;
      });

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", diameter)
      .attr("height", diameter)
      .attr("class", "chart-svg")
      .call(tip);

    const root = d3.hierarchy(json).sum((d) => d.value);

    bubble(root);

    const node = svg
      .selectAll(".node")
      .data(root.children)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    node
      .append("circle")
      .attr("r", (d) => d.r)
      .style("fill", (d) =>
        d.data.clicks >= maxClicks ? "#ffffff" : "#FFFFFF33"
      )
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide)
      .on("mousedown", (event, d) => {
        handleMouseDown(d.data);
      })
      .on("mouseup", (event, d) => {
        handleMouseUp(d.data);
      })
      .on("click", (event, d) => {
        if (d.data.clicks < maxClicks) {
          setCountclicks(countclicks + 1);
          triggerIncrease(d.data);
        }
      });

    node
      .append("text")
      .attr("dy", "0.2em")
      .style("text-anchor", "middle")
      .style("font-family", "Sans-Serif")
      .style("text-wrap", "wrap")
      .style("font-size", "16px") 
      .style("fill", (d) => (d.data.clicks >= maxClicks ? "navy" : "#ffffff"))
      .text((d) => d.data.name)
      .call((d) => wrapText(d, d.r)) 
      .style("pointer-events", "none");
  };

  return (
    <div id="container" className="BubbleChartReactMain">
      <div id="chart" ref={chartRef}></div>
    </div>
  );
};

export default BubbleChartReact;
