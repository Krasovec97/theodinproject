def caesar_cipher (string, number)
    caesar_string = ""

    string.each_char do |i|
      if ("a".."z").include? (i.downcase) # Identify letters only.
        number.times {i = i.next}
      end
      caesar_string << i[-1]
    end
    return caesar_string


  end


  puts "What would you like to encrypt?"
  text = gets.chomp
  puts "By how many numbers would you like to encode?"
  num = gets.chomp

  puts "Your Encode is:"
  puts caesar_cipher( text, num.to_i )
