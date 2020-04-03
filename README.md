# Project of Data Visualization (COM-480)

| Student's name | SCIPER |
| -------------- | ------ |
|     Kooli      | 269603 |
|     Wildi      | 260594 |
|     Schmider   | 274431 |

[Milestone 1](#milestone-1-friday-3rd-april-5pm) • [Milestone 2](#milestone-2-friday-1st-may-5pm) • [Milestone 3](#milestone-3-thursday-28th-may-5pm)

## Milestone 1 (Friday 3rd April, 5pm)

### 1. Dataset
We chose to devote our data visualization project to Android applications. Our data comes from the website [androidrank.org](https://www.androidrank.org), which displays in a very clean manner open information about the 500 most downloaded apps in each category of the Google Play Store. The characteristics provided are the following: number of installs and review, average rating, price and finally the growth in number of reviews for the last 30 and 60 days. Here is an example of what it looks like :


![Overview of the data available at androidrank.org](res/overview.PNG)


The chosen data will not require much pre-processing as it was already well-structured but did require a certain amount of time of scraping. We chose this solution over the existing dataset [Google Play Store Apps](https://www.kaggle.com/lava18/google-play-store-apps) available on Kaggle, because there was no indication on how the selection of the 10’000 apps it presents was made, thus hindering the possibility of displaying meaningful informations from it.

Besides, the data provided on [androidrank.org](https://www.androidrank.org) are up-to-date, which is a considerable advantage in the context of the ever-changing market that are mobile applications. Finally, an API is provided to get more details about the evolution of a particular application, for instance the dates when the app crossed the different number of installations milestones as well as the evolution of the distribution of ratings. This would allow us to do add a more in-depth visualization for a selected group of apps.


### 2. Problematic
We will thus try to show what makes an app successful, especially what are the key characteristics of an app (price, genre…) that have the greater importance in an app’s success. We will also try to visualize the evolution of this success during time and compare this evolution for the most successful apps.

This is moreover something that could be interesting to anyone since nowadays more than 40% of the population owns a smartphone, which of course has apps in it. This is the reason why we chose to display the results in the form of a smartphone. This idea is more developed in the 4th part, and will be even more explained in the Milestone 2.

### 3. Exploratory Data Analysis
We started the exploration of the dataset with some basic statistics to have a general idea of what we were dealing with. You can find all the initial analysis on our Python notebook [analysis.ipynb](analysis.ipynb) with some comments that describe the processing.

The dataset was generally clean and ready to used. However there were… doublons blabla jsp

### 4. Related Work
We can easily find a few plots showing the most successful apps on the stores. However most of them are only based on the number of downloads. After starting to explore the dataset (cf. part 3), we started to think of a more complete score, meaning that our ranking of the most successful apps will not only be based on the downloads but also on other criteria such as ratings. This way, we could maybe have faithful ranking of the apps success.

Moreover as explained previously, the data will be displayed in the form of a smartphone where its apps will give access to the visualised results. It will then be directly related to the content itself and will also make the interface more user-friendly. People using the data will find it easy to jump from a result to another since they are used to this kind of interaction with their own smartphone, but the concept will this time be used as data visualization technique.




## Milestone 2 (Friday 1st May, 5pm)

**10% of the final grade**




## Milestone 3 (Thursday 28th May, 5pm)

**80% of the final grade**

