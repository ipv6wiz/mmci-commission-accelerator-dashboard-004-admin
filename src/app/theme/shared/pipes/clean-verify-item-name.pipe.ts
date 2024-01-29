import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    standalone: true,
    name: 'cleanVerifyItemName'
})
export class CleanVerifyItemNamePipe implements PipeTransform {
    transform(name: string): string {
        return this.autoCapitalize(name.toLowerCase(), '_')
    }
    private autoCapitalize(text: string, sep: string = ' ', joiner: string = ' '): string {
        const words: string[] = text.split(sep);
        for(let w = 0; w < words.length; w++){
            words[w] = words[w].charAt(0).toUpperCase()+words[w].slice(1);
        }
        return words.join(joiner);
    }
}
