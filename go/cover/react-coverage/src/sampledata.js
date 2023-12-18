const data = {
    "Header": "github.com/skelouse/cover-pretty/_example/",
    "Files": {
        "func.go": {
            "Idx": 0,
            "Name": "func.go",
            "Body": "package example\n\nimport (\n        \"math/rand\"\n        \"strings\"\n        \"time\"\n)\n\nfunc Function(a bool) bool \u003cspan class=\"cov8\" title=\"1\"\u003e{\n        if a \u003c/span\u003e\u003cspan class=\"cov8\" title=\"1\"\u003e{\n                return false\n        }\u003c/span\u003e\n\n        \u003cspan class=\"cov0\" title=\"0\"\u003ereturn true\u003c/span\u003e\n}\n\n// https://github.com/XANi/loremipsum\n// LoremIpsum is a lorem ipsum generator\ntype LoremIpsum struct {\n        first bool\n        words []string\n        idx   int\n        rng   *rand.Rand\n}\n\n// New returns new instance of LoremIpsum\nfunc New() *LoremIpsum \u003cspan class=\"cov0\" title=\"0\"\u003e{\n        return NewWithSeed(time.Now().Unix())\n}\u003c/span\u003e\n\n// New returns new instance of LoremIpsum with PRNG seeded with the parameter\nfunc NewWithSeed(seed int64) *LoremIpsum \u003cspan class=\"cov0\" title=\"0\"\u003e{\n        li := new(LoremIpsum)\n        li.rng = rand.New(rand.NewSource(seed))\n        li.first = true\n        li.idx = 0\n        li.shuffle()\n        return li\n}\u003c/span\u003e\n\n// Word returns a single word of lorem ipsum\nfunc (li *LoremIpsum) Word() string \u003cspan class=\"cov0\" title=\"0\"\u003e{\n        return li.words[li.rng.Intn(len(li.words))]\n}\u003c/span\u003e\n\n// WordList returns list of words of lorem ipsum\nfunc (li *LoremIpsum) WordList(count int) []string \u003cspan class=\"cov0\" title=\"0\"\u003e{\n        return li.words[:count]\n}\u003c/span\u003e\n\n// Words returns words of lorem ipsum\nfunc (li *LoremIpsum) Words(count int) string \u003cspan class=\"cov0\" title=\"0\"\u003e{\n        return strings.Join(li.WordList(count), \" \")\n}\u003c/span\u003e\n\n// Sentence returns full sentence of lorem ipsum\nfunc (li *LoremIpsum) Sentence() string \u003cspan class=\"cov0\" title=\"0\"\u003e{\n        l := int(li.gauss(24.46, 5.08))\n        words := li.words[:l]\n        return li.punctuate(words)\n}\u003c/span\u003e\n\n// SentenceList returns list of sentences of lorem ipsum\nfunc (li *LoremIpsum) SentenceList(count int) []string \u003cspan class=\"cov0\" title=\"0\"\u003e{\n        var sentences []string\n        sentences = make([]string, count)\n        for idx := range sentences \u003c/span\u003e\u003cspan class=\"cov0\" title=\"0\"\u003e{\n                sentences[idx] = li.Sentence()\n                li.shuffle()\n        }\u003c/span\u003e\n        \u003cspan class=\"cov0\" title=\"0\"\u003ereturn sentences\u003c/span\u003e\n}\n\n// Sentences returns sentences of lorem ipsum\nfunc (li *LoremIpsum) Sentences(count int) string \u003cspan class=\"cov0\" title=\"0\"\u003e{\n        return strings.Join(li.SentenceList(count), \" \")\n}\u003c/span\u003e\n\n// Paragraph returns full paragraph of lorem ipsum\nfunc (li *LoremIpsum) Paragraph() string \u003cspan class=\"cov0\" title=\"0\"\u003e{\n        return li.Sentences(int(li.gauss(5.8, 1.93)))\n}\u003c/span\u003e\n\n// ParagraphList returns list of paragraphs of lorem ipsum\nfunc (li *LoremIpsum) ParagraphList(count int) []string \u003cspan class=\"cov0\" title=\"0\"\u003e{\n        var paragraphs []string\n        paragraphs = make([]string, count)\n        for idx := range paragraphs \u003c/span\u003e\u003cspan class=\"cov0\" title=\"0\"\u003e{\n                paragraphs[idx] = li.Paragraph()\n        }\u003c/span\u003e\n        \u003cspan class=\"cov0\" title=\"0\"\u003ereturn paragraphs\u003c/span\u003e\n}\n\n// Paragraphs returns paragraphs of lorem ipsum\nfunc (li *LoremIpsum) Paragraphs(count int) string \u003cspan class=\"cov0\" title=\"0\"\u003e{\n        return strings.Join(li.ParagraphList(count), \"\\\\n\")\n}\u003c/span\u003e\n",
            "Coverage": 6.666666666666667,
            "IsDir": false,
            "Files": {},
            "Indent": 0
        },
        "lib": {
            "Idx": 0,
            "Name": "lib",
            "Body": "",
            "Coverage": 0,
            "IsDir": true,
            "Files": {
                "func.go": {
                    "Idx": 1,
                    "Name": "lib/func.go",
                    "Body": "package example\n\nfunc LibFunction(a bool) bool \u003cspan class=\"cov8\" title=\"1\"\u003e{\n        if a \u003c/span\u003e\u003cspan class=\"cov8\" title=\"1\"\u003e{\n                return false\n        }\u003c/span\u003e\n\n        \u003cspan class=\"cov0\" title=\"0\"\u003ereturn true\u003c/span\u003e\n}\n",
                    "Coverage": 66.66666666666666,
                    "IsDir": false,
                    "Files": {},
                    "Indent": 0
                },
                "inner": {
                    "Idx": 0,
                    "Name": "inner",
                    "Body": "",
                    "Coverage": 0,
                    "IsDir": true,
                    "Files": {
                        "func.go": {
                            "Idx": 2,
                            "Name": "lib/inner/func.go",
                            "Body": "package example\n\nfunc LibInnerFunction(a bool) bool \u003cspan class=\"cov8\" title=\"1\"\u003e{\n        if a \u003c/span\u003e\u003cspan class=\"cov8\" title=\"1\"\u003e{\n                return false\n        }\u003c/span\u003e\n\n        \u003cspan class=\"cov0\" title=\"0\"\u003ereturn true\u003c/span\u003e\n}\n",
                            "Coverage": 66.66666666666666,
                            "IsDir": false,
                            "Files": {},
                            "Indent": 3
                        }
                    },
                    "Indent": 3
                }
            },
            "Indent": 0
        },
        "shuffle.go": {
            "Idx": 3,
            "Name": "shuffle.go",
            "Body": "package example\n\nimport (\n        \"math/rand\"\n)\n\n// int31n returns, as an int32, a non-negative pseudo-random number in [0,n).\n// n must be \u0026gt; 0, but int31n does not check this; the caller must ensure it.\n// int31n exists because Int31n is inefficient, but Go 1 compatibility\n// requires that the stream of values produced by math/rand remain unchanged.\n// int31n can thus only be used internally, by newly introduced APIs.\n//\n// For implementation details, see:\n// http://lemire.me/blog/2016/06/27/a-fast-alternative-to-the-modulo-reduction\n// http://lemire.me/blog/2016/06/30/fast-random-shuffling\nfunc (li *LoremIpsum) int31n(n int32) int32 \u003cspan class=\"cov0\" title=\"0\"\u003e{\n        v := li.rng.Uint32()\n        prod := uint64(v) * uint64(n)\n        low := uint32(prod)\n        if low \u0026lt; uint32(n) \u003c/span\u003e\u003cspan class=\"cov0\" title=\"0\"\u003e{\n                thresh := uint32(-n) % uint32(n)\n                for low \u0026lt; thresh \u003c/span\u003e\u003cspan class=\"cov0\" title=\"0\"\u003e{\n                        v = li.rng.Uint32()\n                        prod = uint64(v) * uint64(n)\n                        low = uint32(prod)\n                }\u003c/span\u003e\n        }\n        \u003cspan class=\"cov0\" title=\"0\"\u003ereturn int32(prod \u0026gt;\u0026gt; 32)\u003c/span\u003e\n}\n\n// Shuffle pseudo-randomizes the order of elements.\n// n is the number of elements. Shuffle panics if n \u0026lt; 0.\n// swap swaps the elements with indexes i and j.\nfunc (li *LoremIpsum) shuffleWords(n int, swap func(i, j int)) \u003cspan class=\"cov0\" title=\"0\"\u003e{\n        if n \u0026lt; 0 \u003c/span\u003e\u003cspan class=\"cov0\" title=\"0\"\u003e{\n                panic(\"invalid argument to Shuffle\")\u003c/span\u003e\n        }\n        // Fisher-Yates shuffle: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle\n        // Shuffle really ought not be called with n that doesn't fit in 32 bits.\n        // Not only will it take a very long time, but with 2³¹! possible permutations,\n        // there's no way that any PRNG can have a big enough internal state to\n        // generate even a minuscule percentage of the possible permutations.\n        // Nevertheless, the right API signature accepts an int n, so handle it as best we can.\n        \u003cspan class=\"cov0\" title=\"0\"\u003ei := n - 1\n        for ; i \u0026gt; 1\u0026lt;\u0026lt;31-1-1; i-- \u003c/span\u003e\u003cspan class=\"cov0\" title=\"0\"\u003e{\n                j := int(rand.Int63n(int64(i + 1)))\n                swap(i, j)\n        }\u003c/span\u003e\n        \u003cspan class=\"cov0\" title=\"0\"\u003efor ; i \u0026gt; 0; i-- \u003c/span\u003e\u003cspan class=\"cov0\" title=\"0\"\u003e{\n                j := int(li.int31n(int32(i + 1)))\n                swap(i, j)\n        }\u003c/span\u003e\n}\n\n// Shuffle the words\nfunc (li *LoremIpsum) shuffle() \u003cspan class=\"cov0\" title=\"0\"\u003e{\n        var words []string\n\n        if !li.first \u003c/span\u003e\u003cspan class=\"cov0\" title=\"0\"\u003e{\n                words = make([]string, len(LoremIpsumWords))\n                copy(words, LoremIpsumWords[:])\n        }\u003c/span\u003e else\u003cspan class=\"cov0\" title=\"0\"\u003e {\n                words = make([]string, len(Rest))\n                copy(words, Rest)\n        }\u003c/span\u003e\n        \u003cspan class=\"cov0\" title=\"0\"\u003eli.shuffleWords(len(words), func(i int, j int) \u003c/span\u003e\u003cspan class=\"cov0\" title=\"0\"\u003e{\n                words[i], words[j] = words[j], words[i]\n        }\u003c/span\u003e)\n        \u003cspan class=\"cov0\" title=\"0\"\u003eif li.first \u003c/span\u003e\u003cspan class=\"cov0\" title=\"0\"\u003e{\n                b := make([]string, len(Beg))\n                copy(b, Beg)\n                // words, b = b, words\n                // words = append(words, b...)\n                words = append(b, words...)\n        }\u003c/span\u003e\n        \u003cspan class=\"cov0\" title=\"0\"\u003eli.words = words\n        li.first = false\u003c/span\u003e\n}\n",
            "Coverage": 0,
            "IsDir": false,
            "Files": {},
            "Indent": 0
        },
        "util.go": {
            "Idx": 4,
            "Name": "util.go",
            "Body": "package example\n\nimport (\n        \"math\"\n        \"strings\"\n)\n\nfunc (li *LoremIpsum) gauss(mean, stdDev float64) float64 \u003cspan class=\"cov0\" title=\"0\"\u003e{\n        x := li.rng.Float64()\n        y := li.rng.Float64()\n        z := math.Sqrt(-2*math.Log(x)) * math.Cos(2*math.Pi*y)\n        return z*stdDev + mean\n}\u003c/span\u003e\n\nfunc (li *LoremIpsum) punctuate(sentence []string) string \u003cspan class=\"cov0\" title=\"0\"\u003e{\n        count := len(sentence)\n        if count \u0026gt; 4 \u003c/span\u003e\u003cspan class=\"cov0\" title=\"0\"\u003e{\n                mean := math.Log(float64(count)) / math.Log(6.0)\n                stdDev := mean / 6\n                commas := int(li.gauss(mean, stdDev))\n                for i := 1; i \u0026lt; commas; i++ \u003c/span\u003e\u003cspan class=\"cov0\" title=\"0\"\u003e{\n                        idx := int(float64(i) * float64(count) / (float64(commas) + 1))\n                        if idx \u0026gt; 0 \u0026amp;\u0026amp; idx \u0026lt; (count-1) \u003c/span\u003e\u003cspan class=\"cov0\" title=\"0\"\u003e{\n                                sentence[idx] = sentence[idx] + \",\"\n                        }\u003c/span\u003e\n                }\n        }\n\n        \u003cspan class=\"cov0\" title=\"0\"\u003efirst := strings.Split(sentence[0], \"\")\n        first[0] = strings.ToUpper(first[0])\n        sentence[0] = strings.Join(first, \"\")\n\n        lastIdx := count - 1\n        sentence[lastIdx] = sentence[lastIdx] + \".\"\n\n        return strings.Join(sentence, \" \")\u003c/span\u003e\n}\n",
            "Coverage": 0,
            "IsDir": false,
            "Files": {},
            "Indent": 0
        }
    },
    "RawFiles": [
        {
            "Idx": 0,
            "Name": "func.go",
            "Body": "package example\n\nimport (\n        \"math/rand\"\n        \"strings\"\n        \"time\"\n)\n\nfunc Function(a bool) bool \u003cspan class=\"cov8\" title=\"1\"\u003e{\n        if a \u003c/span\u003e\u003cspan class=\"cov8\" title=\"1\"\u003e{\n                return false\n        }\u003c/span\u003e\n\n        \u003cspan class=\"cov0\" title=\"0\"\u003ereturn true\u003c/span\u003e\n}\n\n// https://github.com/XANi/loremipsum\n// LoremIpsum is a lorem ipsum generator\ntype LoremIpsum struct {\n        first bool\n        words []string\n        idx   int\n        rng   *rand.Rand\n}\n\n// New returns new instance of LoremIpsum\nfunc New() *LoremIpsum \u003cspan class=\"cov0\" title=\"0\"\u003e{\n        return NewWithSeed(time.Now().Unix())\n}\u003c/span\u003e\n\n// New returns new instance of LoremIpsum with PRNG seeded with the parameter\nfunc NewWithSeed(seed int64) *LoremIpsum \u003cspan class=\"cov0\" title=\"0\"\u003e{\n        li := new(LoremIpsum)\n        li.rng = rand.New(rand.NewSource(seed))\n        li.first = true\n        li.idx = 0\n        li.shuffle()\n        return li\n}\u003c/span\u003e\n\n// Word returns a single word of lorem ipsum\nfunc (li *LoremIpsum) Word() string \u003cspan class=\"cov0\" title=\"0\"\u003e{\n        return li.words[li.rng.Intn(len(li.words))]\n}\u003c/span\u003e\n\n// WordList returns list of words of lorem ipsum\nfunc (li *LoremIpsum) WordList(count int) []string \u003cspan class=\"cov0\" title=\"0\"\u003e{\n        return li.words[:count]\n}\u003c/span\u003e\n\n// Words returns words of lorem ipsum\nfunc (li *LoremIpsum) Words(count int) string \u003cspan class=\"cov0\" title=\"0\"\u003e{\n        return strings.Join(li.WordList(count), \" \")\n}\u003c/span\u003e\n\n// Sentence returns full sentence of lorem ipsum\nfunc (li *LoremIpsum) Sentence() string \u003cspan class=\"cov0\" title=\"0\"\u003e{\n        l := int(li.gauss(24.46, 5.08))\n        words := li.words[:l]\n        return li.punctuate(words)\n}\u003c/span\u003e\n\n// SentenceList returns list of sentences of lorem ipsum\nfunc (li *LoremIpsum) SentenceList(count int) []string \u003cspan class=\"cov0\" title=\"0\"\u003e{\n        var sentences []string\n        sentences = make([]string, count)\n        for idx := range sentences \u003c/span\u003e\u003cspan class=\"cov0\" title=\"0\"\u003e{\n                sentences[idx] = li.Sentence()\n                li.shuffle()\n        }\u003c/span\u003e\n        \u003cspan class=\"cov0\" title=\"0\"\u003ereturn sentences\u003c/span\u003e\n}\n\n// Sentences returns sentences of lorem ipsum\nfunc (li *LoremIpsum) Sentences(count int) string \u003cspan class=\"cov0\" title=\"0\"\u003e{\n        return strings.Join(li.SentenceList(count), \" \")\n}\u003c/span\u003e\n\n// Paragraph returns full paragraph of lorem ipsum\nfunc (li *LoremIpsum) Paragraph() string \u003cspan class=\"cov0\" title=\"0\"\u003e{\n        return li.Sentences(int(li.gauss(5.8, 1.93)))\n}\u003c/span\u003e\n\n// ParagraphList returns list of paragraphs of lorem ipsum\nfunc (li *LoremIpsum) ParagraphList(count int) []string \u003cspan class=\"cov0\" title=\"0\"\u003e{\n        var paragraphs []string\n        paragraphs = make([]string, count)\n        for idx := range paragraphs \u003c/span\u003e\u003cspan class=\"cov0\" title=\"0\"\u003e{\n                paragraphs[idx] = li.Paragraph()\n        }\u003c/span\u003e\n        \u003cspan class=\"cov0\" title=\"0\"\u003ereturn paragraphs\u003c/span\u003e\n}\n\n// Paragraphs returns paragraphs of lorem ipsum\nfunc (li *LoremIpsum) Paragraphs(count int) string \u003cspan class=\"cov0\" title=\"0\"\u003e{\n        return strings.Join(li.ParagraphList(count), \"\\\\n\")\n}\u003c/span\u003e\n",
            "Coverage": 6.666666666666667,
            "IsDir": false,
            "Files": {},
            "Indent": 0
        },
        {
            "Idx": 1,
            "Name": "lib/func.go",
            "Body": "package example\n\nfunc LibFunction(a bool) bool \u003cspan class=\"cov8\" title=\"1\"\u003e{\n        if a \u003c/span\u003e\u003cspan class=\"cov8\" title=\"1\"\u003e{\n                return false\n        }\u003c/span\u003e\n\n        \u003cspan class=\"cov0\" title=\"0\"\u003ereturn true\u003c/span\u003e\n}\n",
            "Coverage": 66.66666666666666,
            "IsDir": false,
            "Files": {},
            "Indent": 0
        },
        {
            "Idx": 2,
            "Name": "lib/inner/func.go",
            "Body": "package example\n\nfunc LibInnerFunction(a bool) bool \u003cspan class=\"cov8\" title=\"1\"\u003e{\n        if a \u003c/span\u003e\u003cspan class=\"cov8\" title=\"1\"\u003e{\n                return false\n        }\u003c/span\u003e\n\n        \u003cspan class=\"cov0\" title=\"0\"\u003ereturn true\u003c/span\u003e\n}\n",
            "Coverage": 66.66666666666666,
            "IsDir": false,
            "Files": {},
            "Indent": 3
        },
        {
            "Idx": 3,
            "Name": "shuffle.go",
            "Body": "package example\n\nimport (\n        \"math/rand\"\n)\n\n// int31n returns, as an int32, a non-negative pseudo-random number in [0,n).\n// n must be \u0026gt; 0, but int31n does not check this; the caller must ensure it.\n// int31n exists because Int31n is inefficient, but Go 1 compatibility\n// requires that the stream of values produced by math/rand remain unchanged.\n// int31n can thus only be used internally, by newly introduced APIs.\n//\n// For implementation details, see:\n// http://lemire.me/blog/2016/06/27/a-fast-alternative-to-the-modulo-reduction\n// http://lemire.me/blog/2016/06/30/fast-random-shuffling\nfunc (li *LoremIpsum) int31n(n int32) int32 \u003cspan class=\"cov0\" title=\"0\"\u003e{\n        v := li.rng.Uint32()\n        prod := uint64(v) * uint64(n)\n        low := uint32(prod)\n        if low \u0026lt; uint32(n) \u003c/span\u003e\u003cspan class=\"cov0\" title=\"0\"\u003e{\n                thresh := uint32(-n) % uint32(n)\n                for low \u0026lt; thresh \u003c/span\u003e\u003cspan class=\"cov0\" title=\"0\"\u003e{\n                        v = li.rng.Uint32()\n                        prod = uint64(v) * uint64(n)\n                        low = uint32(prod)\n                }\u003c/span\u003e\n        }\n        \u003cspan class=\"cov0\" title=\"0\"\u003ereturn int32(prod \u0026gt;\u0026gt; 32)\u003c/span\u003e\n}\n\n// Shuffle pseudo-randomizes the order of elements.\n// n is the number of elements. Shuffle panics if n \u0026lt; 0.\n// swap swaps the elements with indexes i and j.\nfunc (li *LoremIpsum) shuffleWords(n int, swap func(i, j int)) \u003cspan class=\"cov0\" title=\"0\"\u003e{\n        if n \u0026lt; 0 \u003c/span\u003e\u003cspan class=\"cov0\" title=\"0\"\u003e{\n                panic(\"invalid argument to Shuffle\")\u003c/span\u003e\n        }\n        // Fisher-Yates shuffle: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle\n        // Shuffle really ought not be called with n that doesn't fit in 32 bits.\n        // Not only will it take a very long time, but with 2³¹! possible permutations,\n        // there's no way that any PRNG can have a big enough internal state to\n        // generate even a minuscule percentage of the possible permutations.\n        // Nevertheless, the right API signature accepts an int n, so handle it as best we can.\n        \u003cspan class=\"cov0\" title=\"0\"\u003ei := n - 1\n        for ; i \u0026gt; 1\u0026lt;\u0026lt;31-1-1; i-- \u003c/span\u003e\u003cspan class=\"cov0\" title=\"0\"\u003e{\n                j := int(rand.Int63n(int64(i + 1)))\n                swap(i, j)\n        }\u003c/span\u003e\n        \u003cspan class=\"cov0\" title=\"0\"\u003efor ; i \u0026gt; 0; i-- \u003c/span\u003e\u003cspan class=\"cov0\" title=\"0\"\u003e{\n                j := int(li.int31n(int32(i + 1)))\n                swap(i, j)\n        }\u003c/span\u003e\n}\n\n// Shuffle the words\nfunc (li *LoremIpsum) shuffle() \u003cspan class=\"cov0\" title=\"0\"\u003e{\n        var words []string\n\n        if !li.first \u003c/span\u003e\u003cspan class=\"cov0\" title=\"0\"\u003e{\n                words = make([]string, len(LoremIpsumWords))\n                copy(words, LoremIpsumWords[:])\n        }\u003c/span\u003e else\u003cspan class=\"cov0\" title=\"0\"\u003e {\n                words = make([]string, len(Rest))\n                copy(words, Rest)\n        }\u003c/span\u003e\n        \u003cspan class=\"cov0\" title=\"0\"\u003eli.shuffleWords(len(words), func(i int, j int) \u003c/span\u003e\u003cspan class=\"cov0\" title=\"0\"\u003e{\n                words[i], words[j] = words[j], words[i]\n        }\u003c/span\u003e)\n        \u003cspan class=\"cov0\" title=\"0\"\u003eif li.first \u003c/span\u003e\u003cspan class=\"cov0\" title=\"0\"\u003e{\n                b := make([]string, len(Beg))\n                copy(b, Beg)\n                // words, b = b, words\n                // words = append(words, b...)\n                words = append(b, words...)\n        }\u003c/span\u003e\n        \u003cspan class=\"cov0\" title=\"0\"\u003eli.words = words\n        li.first = false\u003c/span\u003e\n}\n",
            "Coverage": 0,
            "IsDir": false,
            "Files": {},
            "Indent": 0
        },
        {
            "Idx": 4,
            "Name": "util.go",
            "Body": "package example\n\nimport (\n        \"math\"\n        \"strings\"\n)\n\nfunc (li *LoremIpsum) gauss(mean, stdDev float64) float64 \u003cspan class=\"cov0\" title=\"0\"\u003e{\n        x := li.rng.Float64()\n        y := li.rng.Float64()\n        z := math.Sqrt(-2*math.Log(x)) * math.Cos(2*math.Pi*y)\n        return z*stdDev + mean\n}\u003c/span\u003e\n\nfunc (li *LoremIpsum) punctuate(sentence []string) string \u003cspan class=\"cov0\" title=\"0\"\u003e{\n        count := len(sentence)\n        if count \u0026gt; 4 \u003c/span\u003e\u003cspan class=\"cov0\" title=\"0\"\u003e{\n                mean := math.Log(float64(count)) / math.Log(6.0)\n                stdDev := mean / 6\n                commas := int(li.gauss(mean, stdDev))\n                for i := 1; i \u0026lt; commas; i++ \u003c/span\u003e\u003cspan class=\"cov0\" title=\"0\"\u003e{\n                        idx := int(float64(i) * float64(count) / (float64(commas) + 1))\n                        if idx \u0026gt; 0 \u0026amp;\u0026amp; idx \u0026lt; (count-1) \u003c/span\u003e\u003cspan class=\"cov0\" title=\"0\"\u003e{\n                                sentence[idx] = sentence[idx] + \",\"\n                        }\u003c/span\u003e\n                }\n        }\n\n        \u003cspan class=\"cov0\" title=\"0\"\u003efirst := strings.Split(sentence[0], \"\")\n        first[0] = strings.ToUpper(first[0])\n        sentence[0] = strings.Join(first, \"\")\n\n        lastIdx := count - 1\n        sentence[lastIdx] = sentence[lastIdx] + \".\"\n\n        return strings.Join(sentence, \" \")\u003c/span\u003e\n}\n",
            "Coverage": 0,
            "IsDir": false,
            "Files": {},
            "Indent": 0
        }
    ],
    "Set": true
}

export default data