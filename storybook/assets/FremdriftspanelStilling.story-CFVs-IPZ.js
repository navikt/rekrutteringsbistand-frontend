import{h as I,j as t,aL as k,S as w,h_ as j,i9 as u,ia as x}from"./iframe-C8Gl0mmh.js";import{w as m,c as D}from"./ContextDecorators-DPiGrqzF.js";import{K as b}from"./schema.zod-D_HUtbFK.js";import{u as _}from"./useKandidatlisteForEier-DVnUBf9f.js";import{F as y,A as N}from"./FullførtStilling-D1gQ3eJV.js";import{R as T}from"./GjenåpneStillingKnapp-CZ8vat75.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as A}from"./TilgangskontrollForInnhold-Ck6JuhEX.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BYtw_0rU.js";import"./OrganisasjonsnummerAlert-CB9Kr7E9.js";import"./VStack-BffUPoxl.js";import"./BasePrimitive-DFjLXfXf.js";import"./List-oZe_goSR.js";import"./Link-st7cyUAe.js";import"./KandidatHendelseTag-C0cN80A6.js";import"./Tag-0a98e10q.js";import"./FileXMark-CQYUGwIo.js";import"./Trash-D9mbKbwf.js";import"./HandShakeHeart-CBkS_T2P.js";import"./Calendar-BOo7kByH.js";import"./ThumbUp-CtUREWQf.js";import"./Table-BLgXToty.js";import"./util-CavAHLKM.js";import"./format-BnHT7mDE.js";import"./match-BKbbZIL-.js";import"./parseISO-Dcg31-h9.js";import"./parse-Cnayn12o.js";import"./getDefaultOptions-LCou5PkA.js";import"./util-D23RsQRc.js";import"./kandidat.mock-D5zuwd3j.js";import"./innsatsgrupper-BqldBv0r.js";import"./accordion-DQnyK-5l.js";import"./index-B0r4-VBk.js";import"./index-BGJaoAxc.js";import"./index-BqWKwGG6.js";import"./ChevronDown-jpEGjyLY.js";import"./Box-BDrxSSdg.js";import"./Bell-CTqEs3cs.js";import"./PersonChat-Cbze-wow.js";import"./Eye-yLOnTnHx.js";import"./ProgressBar-BdoWsVH5.js";import"./oppdaterStilling-CWWTAR6Y.js";import"./EyeSlash-D0dgCy-c.js";import"./CircleSlash-0fq_FUVp.js";import"./Modal-CGMMBTKO.js";import"./floating-ui.react-DUCUKrYp.js";import"./Date.Input-CymeDj0W.js";import"./useFormField-7Ac9MHU5.js";import"./useControllableState-CTitMRCv.js";import"./Modal.context-BSnuQfAZ.js";import"./Checkbox-7Jm58HKx.js";import"./Fieldset-CIMoioGY.js";import"./Pencil-ChhYAf27.js";import"./PersonbrukerTekst-W_aJfuqS.js";import"./ClockDashed-Cl0ecpZp.js";import"./Tasklist-DLkqGJ7S.js";import"./ErrorBoundary-C6M1DOyQ.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=_(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(y,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ot={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Ot as default};
