---
title: "Reading in data in Julia, R, and Python"
date: 2016-06-03 22:24:29 -0400
categories:
- R
- Python
- Julia
comments: true
---

I've been fairly interested in the [Julia](http://julialang.org/) programming language recently. Haven't heard of it? From the project website:  "Julia is a high-level, high-performance dynamic programming language for technical computing."

From what I understand, it's a programming language intended
to provide a high-level programming interface with similar
features to R / Python / Matlab at near C-level speed. Sounds
pretty intriguing right? The language is fairly new, so its ecosystem is not as mature as R's or Python's.

At my job I attempted to do some of my work in Julia a couple months back, but honestly never got much further than reading in a .csv into memory.
Anecdotally, it seemed pretty slow to read in data, as well as having very high memory usage. This gave my the sense that Julia was maybe not quite appropriate for my purposes if I couldn't efficiently read in and store a simple .csv.
Naturally, this may have also been a result of my lack of familiarity with the language.

I decided to play around with the language again a couple months later, and downloaded the development version of Julia 0.5.0. The simple benchmark I came up with was:

1. Download  this [airports data](https://raw.githubusercontent.com/hadley/nycflights13/master/data-raw/airports.csv)
2. Read in file to a data frame

In R and Python I was capable of doing both steps at once,
while with Julia I had to download the file separately, and then read in the file, which is no big deal.

I chose this dataset, popularized by [Hadley Wickham](https://github.com/hadley) in some of the vignettes
of his R packages. I don't know the origins of the dataset.

Here are the commands I used to do this analysis:

#### R 3.2.1
<pre><code>
flights = read.csv("https://raw.githubusercontent.com/hadley/nycflights13/master/data-raw/airports.csv")
pryr::object_size(flights)
</code></pre>

#### Python 2.7.10
<pre><code>
import pandas as pd
flights = pd.read_csv("https://raw.githubusercontent.com/hadley/nycflights13/master/data-raw/airports.csv")
flights.values.nbytes
</code></pre>

#### Julia 0.5.0-dev
<pre><code>
using DataFrames
download("https://raw.githubusercontent.com/hadley/nycflights13/master/data-raw/airports.csv", "airpots.csv")
df = readtable("airpots.csv")
whos(r"df")
</code></pre>

## Results

| language    | RAM      | time (sec)|
| ------------|----------|-----------|
| R        | 235 KB    | 0.20 |
| Python   | 78 KB     | 0.19 |
| Julia    | 143 KB    | 5.45 |

### Caveats

My sense is that this was probably a dumb benchmark. Internet download speeds can be variable, and I didn't run this on a very fast internet connection. For Julia I also only timed the `readtable` function and ignored the `download` aspect, out of laziness.

## Discussion

According to this benchmark, R was the least efficient at storing this data in terms of memory usage. My sense is that this is probably related to the fact that R doesn't store numeric data very efficiently since there are no primitive types. By that I mean a single integer in R will take up 48 bytes of memory, when clearly you don't need 48 bytes to store a single integer. It's because the resulting object is actually a vector. In Python, storing an integer (via `var = 1`) takes 24 bytes, and in Julia it takes just 8 bytes. So yea, R is 6
times less memory efficient than Julia for storing a single int. Perhaps this isn't super relevant to this discussion because there's a lot more going on in `dataframe` structures than that.

In terms of speed, clearly Julia was much slower here than R or Python. Obviously I didn't even bother with faster R functions to read in data like `data.table::fread` or `readr::read_csv` . I don't know very much about the data frame implementation or the `readtable` function, so I won't hazard a guess as to why we observed this result. I will conclude by just pointing out that this was a silly benchmark, and it's my sense that Julia was constructed with more in mind than performing well on this benchmark. This was more to satisfy my curiosity than an attempt at a serious benchmark.
