import{h as I,j as t,aL as k,S as w,h_ as j,i9 as u,ia as x}from"./iframe-CGQVJkZv.js";import{w as m,c as D}from"./ContextDecorators-SdjbtubF.js";import{K as b}from"./schema.zod-2EROdYkO.js";import{u as _}from"./useKandidatlisteForEier-DNme2t5h.js";import{F as y,A as N}from"./FullførtStilling-DYkAjO7l.js";import{R as T}from"./GjenåpneStillingKnapp-DNQuKqON.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as A}from"./TilgangskontrollForInnhold-hqc3ms4b.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-z4cn_Tu6.js";import"./OrganisasjonsnummerAlert-C37u_xfx.js";import"./VStack-C5KzQuUX.js";import"./BasePrimitive-s2EheN14.js";import"./List-CNdOL3td.js";import"./Link-BRD7cyqO.js";import"./KandidatHendelseTag-B9e_GCjh.js";import"./Tag-BYGMQyUB.js";import"./ChatExclamationmark-Ctf9I7R-.js";import"./FileXMark-CkGUbLaq.js";import"./Trash-Cfm_mnaq.js";import"./HandShakeHeart-Ct4yzxQW.js";import"./Calendar-KW0SH5xc.js";import"./ThumbUp-VvYbW0ZU.js";import"./Table-Cs32rzIX.js";import"./util-B2m8-gjm.js";import"./format-CR1bAaa0.js";import"./match-BSb9op-T.js";import"./parseISO-DERGW5BV.js";import"./parse-CIYjvRWn.js";import"./getDefaultOptions-B1f2vFnt.js";import"./util-TyBsJmZS.js";import"./kandidat.mock-CM2D1t6n.js";import"./innsatsgrupper-BqldBv0r.js";import"./accordion-CSv255Ec.js";import"./index-BKws7HBG.js";import"./index-C1gDQScB.js";import"./index-Dos7K8On.js";import"./ChevronDown-CotaTqsc.js";import"./Box-Cs6O0icF.js";import"./Bell-CF8fCgg7.js";import"./PersonChat-CrKF06uZ.js";import"./Eye-99Hu_MdQ.js";import"./ProgressBar-tPSnnQhv.js";import"./oppdaterStilling-Ca3ddgKa.js";import"./EyeSlash-my5vJ_CM.js";import"./CircleSlash-0Njrim5g.js";import"./Modal-BYl4lG1R.js";import"./floating-ui.react-BhfoJmgs.js";import"./Date.Input-BF_igJ6F.js";import"./useFormField-DAHFiV9C.js";import"./ReadMore-jjn0L2Ni.js";import"./useControllableState-CIPclepf.js";import"./Modal.context-aOxf75o7.js";import"./Checkbox-DvzrkZKl.js";import"./Fieldset-cJdjguiB.js";import"./Pencil-DYDgl1Qt.js";import"./PersonbrukerTekst-ZDrj15NT.js";import"./ClockDashed-CPtMnLAQ.js";import"./Tasklist-dqQbAf33.js";import"./ErrorBoundary-C-t06yMr.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=_(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(y,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ct={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    // Lukket kandidatliste og stoppet stilling -> Fullført visning
    const stillingsData = {
      ...mockBaseStilling,
      stilling: {
        ...mockBaseStilling.stilling,
        status: 'INACTIVE',
        publishedByAdmin: mockBaseStilling.stilling.publishedByAdmin || new Date().toISOString()
      }
    } as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      lukket: true,
      antall: 4,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.FATT_JOBBEN,
      stillingsData
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />, liste, stillingsData);
  }
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Ct as default};
