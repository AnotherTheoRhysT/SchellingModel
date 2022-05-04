## Running The App

To compile TypeScript, run in root project directory: 

```bash
tsc
```

Run project in Live Server VS Code extension

Go to browser with link `http://127.0.0.1:[PORT]/dist/`

​	PORT is set to 5500 by default, so most likely, it will be `http://127.0.0.1:5500/dist/`



## Logic Documentation

Classification of agents include:

1. susceptible
2. exposed (i.e., infected but not yet infectious)
3. infectious
   1. asymptomatic
   2. presymptomatic
      1. mild
      2. severe
      3. critical
4. recovered
5. dead

Covasim's model structure

![thumbnail](https://journals.plos.org/ploscompbiol/article/figure/image?size=inline&id=10.1371/journal.pcbi.1009149.g001)



The length of time after exposure before an individual becomes infectious is set by default to be a log-normal distribution with a mean of 4.6 days

The length of time between the start of viral shedding and symptom onset is assumed to follow a log-normal distribution with a mean of 1.1 days

![img](https://journals.plos.org/ploscompbiol/article/figure/image?size=large&id=10.1371/journal.pcbi.1009149.t001)

Working age population refers to population 15-64 years old 

- [Working Age Population | Philippine Statistics Authority (psa.gov.ph)](https://psa.gov.ph/content/working-age-population-1#:~:text=Definition%3A,not in the labor force.)

Values of working age population (15-64 yrs old)

| variable | meaning                                                      | value |
| -------- | ------------------------------------------------------------ | ----- |
| r~sus~   | relative susceptibility to infection                         |       |
| p~sym~   | probability of developing symptoms                           |       |
| p~sev~   | probability of developing severe symptoms (i.e., sufficient to justify hospitalization) |       |
| p~cri~   | probability of developing into a critical case (i.e., sufficient to require ICU) |       |
| p~dea~   | probability of death                                         |       |



each individual has an average of 20 contacts per day, a value of *β* = 0.016 corresponds to a doubling time of roughly 4–6 days and an *R~0~* of approximately 2.2–2.7 (NOTE: *β* and R~0~ was calibrated for Washington and Oregon. Research on Philippine values for this)

The default viral load for each agent is drawn from a negative binomial distribution with mean 1.0 and shape parameter 0.45, which was the value most consistent with both international estimates

- Viral load - amount of virus found in body



#### Contacts 

Covasim can generate either Random Networks, SynthPop Networks, and Hybrid Networks

Random Networks - Each person is assigned a number of daily contacts, which is drawn from a Poisson distribution whose mean value can be specified by the user depending on the modeling context (with a default value of 20)

![img](https://journals.plos.org/ploscompbiol/article/figure/image?size=large&id=10.1371/journal.pcbi.1009149.t003)



