import{ac as I,ad as w,j as t,R as k,S as j,cn as x,cp as b,aG as g,cB as u,aP as y,cC as _}from"./iframe-vr_vckGk.js";import{w as d,c as D}from"./ContextDecorators-DzycDGbR.js";import{F as N,A as v}from"./FullførtStilling-CJ8CCdm_.js";import{R as T}from"./GjenåpneStillingKnapp-B3eRQzQn.js";import{T as A}from"./TilgangskontrollForInnhold-CxH4UQuL.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DU2FV14N.js";import"./OrganisasjonsnummerAlert-Qw1WU52J.js";import"./VStack-Ids80tda.js";import"./BasePrimitive-ExeXI_SP.js";import"./List-CiVt3XBZ.js";import"./Link-k3aQI0r3.js";import"./KandidatHendelseTag-CPz9oTVw.js";import"./Tag-Cq5UuXvY.js";import"./FileXMark-CWV7r_z-.js";import"./Trash-CnXQhLYY.js";import"./HandShakeHeart-Djq4CAR-.js";import"./Calendar-Chg5Ppxx.js";import"./ThumbUp-DVF4cc9d.js";import"./Table-gSzwElD0.js";import"./util-DBcg3zLe.js";import"./format-C67-2JLM.js";import"./match-Ce7tQTkY.js";import"./parseISO-D2AKsVns.js";import"./parse-4IUJS7Td.js";import"./getDefaultOptions-B0vCFA6N.js";import"./util-C22SUHcZ.js";import"./accordion-h61BpNFd.js";import"./index-BrYXp6-4.js";import"./index-Bykbx9lX.js";import"./index-BM-mmOjp.js";import"./ChevronDown-DivzrKGZ.js";import"./Box-8ic-UifT.js";import"./Bell-CNxaaMDp.js";import"./PersonChat-D-oi4X19.js";import"./Eye-BcpJQAXK.js";import"./ProgressBar-C0BeHgES.js";import"./EyeSlash-CcUwdN9s.js";import"./CircleSlash-Bz0bOfIC.js";import"./Modal-xZlbM4lC.js";import"./floating-ui.react-D3dI4Bwq.js";import"./Date.Input-DP84DOjr.js";import"./useFormField-BLHpsu6M.js";import"./useControllableState-PzA6H3Er.js";import"./Modal.context-DClbNTny.js";import"./Checkbox-Clvo4kV4.js";import"./Fieldset-DFK51L0p.js";import"./Pencil-BFgo6Gsv.js";import"./PersonbrukerTekst-VCGk-hXq.js";import"./ClockDashed-rQipkp48.js";import"./Tasklist-xIyCIqFz.js";import"./ErrorBoundary-6LOvdMfY.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[m],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const vt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,vt as default};
