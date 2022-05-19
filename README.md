## Locally Running The App

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

![img](https://journals.plos.org/ploscompbiol/article/figure/image?size=large&id=10.1371/journal.pcbi.1009149.t002)

Age-linked disease susceptibility, progression, and mortality probabilities



Working age population refers to population 15-64 years old 

- [Working Age Population | Philippine Statistics Authority (psa.gov.ph)](https://psa.gov.ph/content/working-age-population-1#:~:text=Definition%3A,not in the labor force.)

Values of working age population (15-64 yrs old)



[The Incubation Period of Coronavirus Disease 2019 (COVID-19) From Publicly Reported Confirmed Cases: Estimation and Application | Annals of Internal Medicine (acpjournals.org)](https://www.acpjournals.org/doi/10.7326/M20-0504)

15% to 20% of infections are asymptomatic (JK NOT USING THIS)



| variable | meaning                                                      | value |
| -------- | ------------------------------------------------------------ | ----- |
| r~sus~   | relative susceptibility to infection                         |       |
| p~sym~   | probability of developing symptoms                           |       |
| p~sev~   | probability of developing severe symptoms (i.e., sufficient to justify hospitalization) |       |
| p~cri~   | probability of developing into a critical case (i.e., sufficient to require ICU) |       |
| p~dea~   | probability of death                                         |       |



each individual has an average of 20 contacts per day, a value of *β* = 0.016 corresponds to a doubling time of roughly 4–6 days and an *R~0~* of approximately 2.2–2.7 (NOTE: *β* and R~0~ was calibrated for Washington and Oregon. Research on Philippine values for this)

β = transmissibility

The default viral load for each agent is drawn from a negative binomial distribution with mean 1.0 and shape parameter 0.45, which was the value most consistent with both international estimates

- Viral load - amount of virus found in body



#### Contacts 

Covasim can generate either Random Networks, SynthPop Networks, and Hybrid Networks

Random Networks - Each person is assigned a number of daily contacts, which is drawn from a Poisson distribution whose mean value can be specified by the user depending on the modeling context (with a default value of 20)

![img](https://journals.plos.org/ploscompbiol/article/figure/image?size=large&id=10.1371/journal.pcbi.1009149.t003)



### Interventions

(a) reductions in transmissibility per contact, such as through mask wearing, personal protective equipment, hand-washing, and maintaining physical distance; and (b) reductions in the number of contacts at home, school, work, or in the community



### Model Outputs

By default, Covasim outputs three main types of result: "stocks" (e.g., the number of people with currently active infections on a given day), "flows" (e.g., the number of new infections on a given day), and "cumulative flows" (e.g., the cumulative number of infections up to a given day).

But our app will output only the "stocks", ie:

n_susceptible	n_exposed	n_infectious	n_symptomatic	n_severe	n_critical	n_recovered	n_dead	n_diagnosed	n_known_dead	n_quarantined	n_vaccinated	n_imports	n_alive	n_naive	n_preinfectious	n_removed	prevalence	incidence	r_eff	doubling_time



### Reproduction Number and Doubling Time

default method Covasim uses for computing *Re* is to divide the number of new infections on day *t* by the number of actively infectious people on day *t*, multiplied by the average duration of infectiousness ("method 4")

Covasim also includes an estimate of the epidemic doubling time, computed similarly to the "rule of 69.3" [[74](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1009149#pcbi.1009149.ref074)], specifically:

![img](https://journals.plos.org/ploscompbiol/article/file?type=thumbnail&id=10.1371/journal.pcbi.1009149.e002)



### Calibration

To date, the Optuna hyperparameter optimization library [[80](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1009149#pcbi.1009149.ref080)] has proven to be the most effective approach for calibration, and an implementation is included in the codebase.





## Testing

| variable     | value      |
| ------------ | ---------- |
| pop_size     | 50,000     |
| pop_infected | 100        |
| start_day    | 2021-04-01 |
| n_days       | 90         |





Data from [World Population Prospects - Population Division - United Nations](https://population.un.org/wpp/Download/Standard/Population/)





[T5 - Using interventions — Covasim 3.1.2 documentation (idmod.org)](https://docs.idmod.org/projects/covasim/en/latest/tutorials/tut_interventions.html)

Overall, it’s best to use `change_beta` for interventions that reduce per-contact risk (e.g., masks), and `clip_edges` for interventions that reduce the number of contacts per person. However, in practice, it tends to make relatively little difference to the simulation results. If in doubt, use `change_beta`.





```python
import covasim as cv
import pandas as pd
import numpy as np

betas = np.linspace(0.010, 0.020, 5)

def philSim():
    pars = dict(
        pop_size = 50e3,
        pop_infected = 100,
        location = 'philippines',
        pop_type = 'hybrid',
        start_day = '2020-04-01',
        n_days = 90
    )

    for beta in betas:
        sim = cv.Sim(pars, beta=beta, label=f'Beta = {beta}')
        sim.run()
        sim.plot(['n_infectious'])


def randSim():
    pars = dict(
        pop_size = 50e3,
        pop_infected = 100,
        pop_type = 'random',
        start_day = '2020-04-01',
        n_days = 90
    )

    for beta in betas:
        sim = cv.Sim(pars, beta=beta, label=f'Beta = {beta}')
        sim.run()
        fig = sim.plot(['n_infectious'])


philSim()
randSim()
```





