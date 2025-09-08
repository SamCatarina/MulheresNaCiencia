import { useState, useMemo } from "react";
import { allScientists, getAllResearchThemes } from "../data/scientists";
import ScientistCard from "../components/scientist-card";
import SearchFilters from "../components/search-filters";
import { Button } from "../components/ui/button";
import SuggestScientist from "../components/form-sugestion";
import { useRoute } from "wouter";
import ExpandableList from "../components/expandableList";

export default function Career() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Carreiras na Ciência
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore áreas de estudo e opções de carreira em cursos oferecidos na cidade de Salgueiro
          </p>
        </div>

        <ExpandableList
          items={[
            {
              title: "Ciência da Computação",
              content:
                "O curso de Ciência da Computação da Univasf forma profissionais para atuar no desenvolvimento científico e tecnológico da computação, envolvendo tanto hardware quanto software. O foco é compreender e aplicar a computação em diferentes contextos, como processamento de grandes volumes de dados, automação, controle de sistemas, comunicação digital e aplicações na saúde, meio ambiente e educação. O currículo valoriza a formação crítica, ética e humanista, preparando os alunos para contribuir com soluções inovadoras para a sociedade e para o avanço da ciência no semiárido e no mundo.",
              areas: [
                {
                  label: "Pesquisador em Computação",
                  url: "https://pt.wikipedia.org/wiki/Ci%C3%AAncia_da_computa%C3%A7%C3%A3o",
                },
                {
                  label: "Especialista em Computação Científica",
                  url: "https://pt.wikipedia.org/wiki/Computa%C3%A7%C3%A3o_cient%C3%ADfica",
                },
                {
                  label: "Analista de Processamento de Dados Científicos",
                },
                {
                  label: "Cientista de Dados",
                  url: "https://pt.wikipedia.org/wiki/Cientista_de_dados",
                },
                {
                  label: "Cientista em Inteligência Artificial",
                },
                {
                  label: "Engenheiro de Sistemas Computacionais",
                },
              ],
            },
          ]}
        />

        <ExpandableList
          items={[
            {
              title: "Engenharia de Produção",
              content:
                "O curso de Engenharia de Produção forma profissionais capazes de atuar na pesquisa, análise e melhoria de sistemas produtivos, integrando conhecimentos de engenharia, matemática, estatística e ciências sociais aplicadas. O foco está no desenvolvimento científico de métodos, modelos e tecnologias que otimizem processos, recursos e sistemas complexos. O currículo busca preparar engenheiros com visão crítica, capazes de propor soluções sustentáveis e inovadoras para desafios da indústria, serviços, logística e políticas públicas.",
              areas: [
                {
                  label: "Pesquisador em Engenharia de Produção",
                },
                {
                  label: "Especialista em Otimização de Sistemas",
                },
                {
                  label: "Cientista de Dados Aplicados à Produção",
                  url: "https://pt.wikipedia.org/wiki/Cientista_de_dados",
                },
                {
                  label: "Analista de Modelagem de Processos",
                },
                {
                  label: "Engenheiro de Pesquisa Operacional",
                  url: "https://pt.wikipedia.org/wiki/Pesquisa_operacional",
                },
                {
                  label: "Especialista em Inteligência Industrial",
                },
              ],
            },
          ]}
        />

        <ExpandableList
          items={[
            {
              title: "Física",
              content:
                "O curso de Física prepara profissionais para investigar os princípios fundamentais da natureza, por meio de métodos científicos e modelagens matemáticas. Com forte base teórica e experimental, o curso estimula a pesquisa em áreas como física quântica, astrofísica, física de partículas, física da matéria condensada e instrumentação científica. Além disso, promove o desenvolvimento de tecnologias aplicadas em setores como energia, saúde, computação e materiais. A formação também envolve reflexões éticas, históricas e filosóficas sobre o papel da ciência na sociedade.",
              areas: [
                {
                  label: "Pesquisador em Física Teórica",
                  url: "https://pt.wikipedia.org/wiki/F%C3%ADsica_te%C3%B3rica",
                },
                {
                  label: "Físico Experimental",
                  url: "https://pt.wikipedia.org/wiki/F%C3%ADsica_experimental",
                },
                {
                  label: "Astrofísico",
                  url: "https://pt.wikipedia.org/wiki/Astrof%C3%ADsica",
                },
                {
                  label: "Especialista em Física de Partículas",
                },
                {
                  label: "Cientista em Física Aplicada",
                },
                {
                  label: "Pesquisador em Física Médica",
                  url: "https://pt.wikipedia.org/wiki/F%C3%ADsica_m%C3%A9dica",
                },
                {
                  label: "Especialista em Materiais e Nanotecnologia",
                },
              ],
            },
          ]}
        />

        <ExpandableList
          items={[
            {
              title: "Tecnologia em Sistemas para Internet",
              content:
                "Este curso prepara profissionais para atuar na pesquisa, desenvolvimento e inovação de tecnologias voltadas à internet, indo além da programação tradicional. A formação abrange áreas como web semântica, segurança da informação, acessibilidade digital, inteligência artificial para aplicações web e interação humano-computador. O curso incentiva a produção de conhecimento científico e tecnológico, com impacto direto em inclusão digital, educação, comunicação e transformação social no ambiente virtual.",
              areas: [
                {
                  label: "Pesquisador em Web Semântica",
                  url: "https://pt.wikipedia.org/wiki/Web_sem%C3%A2ntica",
                },
                {
                  label: "Especialista em Acessibilidade Digital",
                },
                {
                  label: "Cientista em Interação Humano-Computador",
                  url: "https://pt.wikipedia.org/wiki/Intera%C3%A7%C3%A3o_humano-computador",
                },
                {
                  label: "Pesquisador em Segurança Cibernética",
                  url: "https://pt.wikipedia.org/wiki/Seguran%C3%A7a_da_informa%C3%A7%C3%A3o",
                },
                {
                  label:
                    "Especialista em Inteligência Artificial Aplicada à Web",
                },
                {
                  label: "Cientista em Tecnologias Educacionais Digitais",
                },
                {
                  label: "Pesquisador em Computação Social e Web 3.0",
                },
              ],
            },
          ]}
        />

        <ExpandableList
          items={[
            {
              title: "Engenharia Civil",
              content:
                "O curso de Engenharia Civil também possui um importante papel na pesquisa e no desenvolvimento científico de novas tecnologias, materiais e soluções estruturais. Áreas como engenharia de materiais, sustentabilidade, modelagem computacional, geotecnia, hidrologia e infraestrutura urbana são campos de investigação contínua. A formação permite que o engenheiro atue em estudos de impacto ambiental, inovações em construção civil, monitoramento de estruturas e desenvolvimento de cidades inteligentes, contribuindo para o avanço da ciência aplicada e para melhorias sociais de grande escala.",
              areas: [
                {
                  label: "Pesquisador em Engenharia Estrutural",
                },
                {
                  label: "Especialista em Materiais de Construção Avançados",
                },
                {
                  label: "Cientista em Sustentabilidade Urbana",
                },
                {
                  label: "Pesquisador em Hidrologia e Recursos Hídricos",
                },
                {
                  label: "Especialista em Geotecnia Aplicada",
                },
                {
                  label: "Analista em Modelagem Computacional Estrutural",
                },
                {
                  label: "Pesquisador em Cidades Inteligentes e Infraestrutura",
                },
              ],
            },
          ]}
        />

        <ExpandableList
          items={[
            {
              title: "Tecnologia em Alimentos",
              content:
                "O curso de Tecnologia em Alimentos prepara profissionais para atuar na pesquisa e desenvolvimento de novos produtos alimentícios, controle de qualidade, segurança alimentar e inovação em processos industriais. A formação envolve conhecimentos interdisciplinares em microbiologia, bioquímica, engenharia de alimentos e sustentabilidade. O tecnólogo em alimentos pode contribuir com pesquisas que impactam diretamente a saúde pública, a nutrição, a redução de desperdícios e a melhoria da qualidade dos alimentos produzidos e consumidos pela sociedade.",
              areas: [
                {
                  label: "Pesquisador em Desenvolvimento de Alimentos",
                },
                {
                  label: "Especialista em Segurança Alimentar",
                  url: "https://pt.wikipedia.org/wiki/Seguran%C3%A7a_alimentar",
                },
                {
                  label: "Cientista em Microbiologia de Alimentos",
                },
                {
                  label:
                    "Pesquisador em Processos e Tecnologias de Conservação",
                },
                {
                  label: "Especialista em Inovação de Produtos Alimentícios",
                },
                {
                  label: "Analista em Qualidade e Controle Sanitário",
                },
                {
                  label:
                    "Cientista em Sustentabilidade na Indústria Alimentícia",
                },
              ],
            },
          ]}
        />

        <ExpandableList
          items={[
            {
              title: "Administração",
              content:
                "O curso de Administração também é um campo científico que busca compreender, modelar e aprimorar o funcionamento das organizações e da sociedade. Com base em métodos de pesquisa quantitativa e qualitativa, investiga temas como comportamento organizacional, políticas públicas, inovação, gestão de pessoas, sustentabilidade e economia institucional. O curso forma profissionais preparados para produzir conhecimento científico sobre práticas organizacionais e seus impactos sociais, econômicos e ambientais.",
              areas: [
                {
                  label: "Pesquisador em Comportamento Organizacional",
                },
                {
                  label: "Especialista em Gestão Pública e Políticas Públicas",
                },
                {
                  label: "Cientista em Inovação e Estratégia Organizacional",
                },
                {
                  label: "Pesquisador em Sustentabilidade Corporativa",
                },
                {
                  label:
                    "Especialista em Empreendedorismo e Desenvolvimento Regional",
                },
                {
                  label: "Analista em Estudos Institucionais e Econômicos",
                },
                {
                  label:
                    "Cientista em Gestão de Pessoas e Cultura Organizacional",
                },
              ],
            },
          ]}
        />


      </div>
    </section>
  );
}
