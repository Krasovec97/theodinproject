dictionary = ["below","down","go","going","horn","how","howdy","it","i","low","own","part","partner","sit"]

def substring (word = "below", dictionary)
    multiple_word = word.downcase.split(" ")
    multiple_words_split = multiple_word.flat_map { |value| split_word(value).intersection(dictionary) }.flatten

    multiple_words_split.tally
end

def split_word (string)
      (0..string.length).inject([]) {|sum, value|
        (1..string.length - value).inject(sum) { |sum2,value2| sum2 << string[value,value2] }
      }.uniq
end

puts substring("below", dictionary)

