import{am as I,an as w,j as t,p as k,S as j,ci as x,ck as b,cm as g,cz as u,aK as y,cA as _}from"./iframe-CQcQKVHJ.js";import{w as m,c as D}from"./ContextDecorators-C7RnmZVl.js";import{F as N,A as v}from"./FullførtStilling-Dl9UKNuS.js";import{R as T}from"./GjenåpneStillingKnapp-C3Fxg8ls.js";import{T as A}from"./TilgangskontrollForInnhold-D3GpRNJv.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CLD8Yobj.js";import"./OrganisasjonsnummerAlert-C3V9N-mA.js";import"./VStack-BkcKOsGL.js";import"./BasePrimitive-R7dqkGXT.js";import"./List-oE4KN9Jk.js";import"./Link-CNM6WXAJ.js";import"./KandidatHendelseTag-_wYeKXt7.js";import"./Tag-B1UgeQBj.js";import"./FileXMark-Bs2UkFRM.js";import"./Trash-BXz9vHTO.js";import"./HandShakeHeart-1ht42tEv.js";import"./Calendar-DLiZi9ru.js";import"./ThumbUp-BZVFYXyc.js";import"./Table-Dxrl4W2c.js";import"./util-D4RQEmo9.js";import"./format-CArDlM88.js";import"./match-CzCdKmhZ.js";import"./parse-CAYOWmc-.js";import"./getDefaultOptions-CQzlSNmC.js";import"./parseISO-CD2GUqTb.js";import"./util-B1ze5Nv7.js";import"./accordion-Ce1J5UYQ.js";import"./index-Bt5AwJDw.js";import"./index-14O9HcY3.js";import"./index-CB9cVPfK.js";import"./ChevronDown-D-JqxndO.js";import"./Box-CNvANlqZ.js";import"./Bell-CnBYU47g.js";import"./PersonChat-BhvTg0Ld.js";import"./Eye-rL-2B4qX.js";import"./ProgressBar-C2GzpMlE.js";import"./EyeSlash-rSCJdrhY.js";import"./CircleSlash-CSIIAtLa.js";import"./Modal-CTeQBcRN.js";import"./floating-ui.react-DEmG-l0u.js";import"./Date.Input-EHz2oxZ9.js";import"./useFormField-BFganqKl.js";import"./useControllableState-3MLhtD_J.js";import"./Modal.context-Ab6UYj-Y.js";import"./Checkbox-CUCvEVhV.js";import"./Fieldset-DSyxaQB-.js";import"./Pencil-CDw249sI.js";import"./PersonbrukerTekst-Dl5dx5mm.js";import"./ClockDashed-BCuVce0X.js";import"./Tasklist-CSlzb8Ng.js";import"./ErrorBoundary-C5rlAmdS.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const vt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
